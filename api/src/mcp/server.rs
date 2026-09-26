use std::net::IpAddr;

use axum::http::request::Parts;
use governor::clock::Clock;
use rmcp::model::{
    CallToolRequestParams, CallToolResponse, CallToolResult, ContentBlock, Implementation,
    JsonObject, ListToolsResult, PaginatedRequestParams, ServerCapabilities, ServerConfig, Tool,
};
use rmcp::service::{NotificationContext, RequestContext};
use rmcp::{ErrorData, RoleServer, ServerHandler};
use serde::Serialize;
use serde::de::DeserializeOwned;

use crate::limits::{Overload, SearchSlots};
use crate::routes::{ApiError, MAX_QUERY_CHARS, retry_after_secs};
use crate::state::{AppState, Loaded};

use super::Client;
use super::answers;
use super::names::{self, Suggestion};
use super::tools::{self, AlternativesTo, GetTool, ListTools, Name, SearchFor};

const SERVER_NAME: &str = "awesome-alternatives";
const WEBSITE: &str = "https://awesome-alternatives.com";
const INSTRUCTIONS: &str = "Awesome Alternatives is a curated catalog of open-source alternatives to developer tools and closed products, with repository facts (stars, licence, releases, activity) refreshed daily. To replace something, call find_alternatives with its name. To browse, call list_categories, then list_tools with a category, language, licence or other filter. For everything on one tool, call get_tool with its slug. Call search only for a free-text request you cannot turn into those filters: it has a per-client quota, the other tools do not. The catalog is CC0 and every tool links to its repository.";

#[derive(Clone)]
pub struct CatalogServer {
    state: AppState,
    searches: SearchSlots,
}

#[derive(Debug, thiserror::Error)]
enum Refusal {
    #[error("the arguments do not fit this tool: {0}")]
    Arguments(serde_json::Error),
    #[error("nothing called {0:?} in the catalog")]
    Unknown(String, Vec<Suggestion>),
    #[error(transparent)]
    Api(#[from] ApiError),
    #[error(transparent)]
    Overload(#[from] Overload),
    #[error("the answer could not be encoded: {0}")]
    Encoding(serde_json::Error),
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Failure<'a> {
    error: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    retry_after_seconds: Option<u64>,
    #[serde(skip_serializing_if = "<[_]>::is_empty")]
    close_matches: &'a [Suggestion],
}

impl Refusal {
    fn into_result(self) -> CallToolResult {
        let retry_after_seconds = match &self {
            Self::Api(ApiError::RateLimited(wait)) => Some(retry_after_secs(*wait)),
            Self::Overload(Overload::Busy) => Some(1),
            _ => None,
        };
        let close_matches = match &self {
            Self::Unknown(_, close) => close.as_slice(),
            _ => &[],
        };
        let failure = Failure {
            error: self.to_string(),
            retry_after_seconds,
            close_matches,
        };
        match reply(&failure, CallToolResult::structured_error) {
            Ok(result) => result,
            Err(_) => CallToolResult::error(vec![ContentBlock::text(failure.error)]),
        }
    }
}

impl CatalogServer {
    pub fn new(state: AppState, searches: SearchSlots) -> Self {
        Self { state, searches }
    }

    async fn answer(
        &self,
        name: Name,
        arguments: JsonObject,
        client: Option<IpAddr>,
    ) -> Result<CallToolResult, ErrorData> {
        let loaded = self.state.loaded();
        let answered = match name {
            Name::FindAlternatives => {
                parse(arguments).and_then(|args| find_alternatives(&loaded, &args))
            }
            Name::GetTool => {
                parse(arguments).and_then(|args| encode(catalog_tool(&loaded, &args)?))
            }
            Name::ListTools => parse(arguments).and_then(|args: ListTools| {
                let misses = args.filters.near_misses(&loaded.catalog.tools);
                encode(&answers::listing(
                    &loaded,
                    &args.filters,
                    &args.window,
                    &misses,
                ))
            }),
            Name::ListCategories => encode(&answers::categories(&loaded)),
            Name::Search => {
                let client = client.ok_or_else(|| {
                    ErrorData::internal_error("the client address is unknown", None)
                })?;
                match parse(arguments) {
                    Ok(args) => self.search(&loaded, &args, client).await,
                    Err(refusal) => Err(refusal),
                }
            }
        };
        Ok(answered.unwrap_or_else(Refusal::into_result))
    }

    async fn search(
        &self,
        loaded: &Loaded,
        args: &SearchFor,
        client: IpAddr,
    ) -> Result<CallToolResult, Refusal> {
        let query = args.query.trim();
        if query.is_empty() {
            return Err(ApiError::EmptyQuery.into());
        }
        if query.chars().count() > MAX_QUERY_CHARS {
            return Err(ApiError::QueryTooLong.into());
        }
        let _slot = self.searches.try_take().ok_or(Overload::Busy)?;
        let limiter = &self.state.mcp_limiter;
        limiter.check_key(&client).map_err(|limited| {
            ApiError::RateLimited(limited.wait_time_from(limiter.clock().now()))
        })?;
        let read = self.state.search.interpret_without_jev(query, loaded).await;
        let misses = read.filters.near_misses(&loaded.catalog.tools);
        encode(&answers::searched(
            loaded,
            query,
            &read,
            &args.window,
            &misses,
        ))
    }
}

fn parse<T: DeserializeOwned>(arguments: JsonObject) -> Result<T, Refusal> {
    serde_json::from_value(serde_json::Value::Object(arguments)).map_err(Refusal::Arguments)
}

fn reply(
    answer: &impl Serialize,
    build: fn(serde_json::Value) -> CallToolResult,
) -> Result<CallToolResult, serde_json::Error> {
    let mut result = build(serde_json::to_value(answer)?);
    result.content = vec![ContentBlock::text(serde_json::to_string(answer)?)];
    Ok(result)
}

fn encode(answer: &impl Serialize) -> Result<CallToolResult, Refusal> {
    reply(answer, CallToolResult::structured).map_err(Refusal::Encoding)
}

fn find_alternatives(loaded: &Loaded, args: &AlternativesTo) -> Result<CallToolResult, Refusal> {
    let target = names::resolve(names::replaceable(loaded), &args.tool).ok_or_else(|| {
        Refusal::Unknown(
            args.tool.clone(),
            names::close_to(names::replaceable(loaded), &args.tool),
        )
    })?;
    let filters = args.filters(target.slug);
    let misses = filters.near_misses(&loaded.catalog.tools);
    encode(&answers::alternatives(
        loaded,
        target,
        &filters,
        &args.window,
        &misses,
    ))
}

fn catalog_tool<'a>(
    loaded: &'a Loaded,
    args: &GetTool,
) -> Result<&'a crate::catalog::Tool, Refusal> {
    let found = names::resolve(names::listed(loaded), &args.slug).and_then(|named| {
        loaded
            .catalog
            .tools
            .iter()
            .find(|tool| tool.slug == named.slug)
    });
    found.ok_or_else(|| {
        Refusal::Unknown(
            args.slug.clone(),
            names::close_to(names::listed(loaded), &args.slug),
        )
    })
}

impl ServerHandler for CatalogServer {
    fn get_info(&self) -> ServerConfig {
        ServerConfig::new(ServerCapabilities::builder().enable_tools().build())
            .with_server_info(
                Implementation::new(SERVER_NAME, env!("CARGO_PKG_VERSION"))
                    .with_title("Awesome Alternatives")
                    .with_website_url(WEBSITE),
            )
            .with_instructions(INSTRUCTIONS)
    }

    async fn list_tools(
        &self,
        _request: Option<PaginatedRequestParams>,
        _context: RequestContext<RoleServer>,
    ) -> Result<ListToolsResult, ErrorData> {
        Ok(ListToolsResult::with_all_items(tools::definitions()))
    }

    fn get_tool(&self, name: &str) -> Option<Tool> {
        Name::parse(name).map(Name::definition)
    }

    async fn call_tool(
        &self,
        request: CallToolRequestParams,
        context: RequestContext<RoleServer>,
    ) -> Result<CallToolResponse, ErrorData> {
        let name = Name::parse(&request.name).ok_or_else(|| {
            ErrorData::invalid_params(format!("unknown tool: {}", request.name), None)
        })?;
        let client = context
            .extensions
            .get::<Parts>()
            .and_then(|parts| parts.extensions.get::<Client>())
            .map(|client| client.0);
        self.answer(name, request.arguments.unwrap_or_default(), client)
            .await
            .map(CallToolResponse::from)
    }

    async fn on_initialized(&self, _context: NotificationContext<RoleServer>) {}
}
