import { islands } from "./islands.en.ts";
import { pages } from "./pages.en.ts";

export const en = {
  locale: {
    name: "English",
    htmlLang: "en",
    ogLocale: "en_US",
  },

  chrome: {
    skipToContent: "Skip to content",
    brandLabel: "awesome-alternatives, home",
    searchLabel: "Search the catalog",
    searchPlaceholder: "Search alternatives",
    searchSubmit: "Search",
    languageLabel: "Language",
    feedTitle: "awesome-alternatives: new tools",
    socialAlt: "awesome-alternatives: say what you use and what you need.",
    nav: {
      browse: "Browse",
      about: "About",
      contribute: "Add a tool",
      github: "GitHub",
    },
    footer: {
      label: "Footer",
      catalog: "Catalog",
      code: "code",
      data: "data",
      dataLink: "from GitHub, every night",
      howItWorks: "How it works",
      rss: "RSS feed",
      legalNotice: "Legal notice",
      privacy: "Privacy",
      github: "GitHub ↗",
    },
  },

  home: {
    title: "awesome-alternatives: find what replaces the tool you use",
    description:
      "Search for an alternative to a developer tool by language, licence and fit. Stars, releases and signatures come straight from GitHub.",
    eyebrow: "Find what replaces the tool you use",
    heading: "Say what you use and what you need.",
    lede: "{count} tools, release data pulled from GitHub nightly, never typed by hand",
    noscriptBefore: "Search needs JavaScript. Every tool is listed below: ",
    noscriptLink: "browse by the tool you want to replace",
    noscriptAfter: ".",
    browseLabel: "Browse by tool",
    allTools: "All tools",
    categories: "Categories",
    languages: "Languages",
    licenses: "Licences",
    owners: "Owners",
    examples: [
      "semantic-release, but written in Rust",
      "a drop-in for webpack, faster",
      "Redis, but multithreaded",
      "changelog generator under MIT",
      "replace Terraform",
    ],
  },

  listing: {
    back: "← back",
    browse: "browse",
    toolCount: { one: "1 tool", other: "{n} tools" },
  },

  index: {
    alternatives: {
      title: "Alternatives to popular developer tools",
      description:
        "{count} developer tools and what replaces each of them, compared by fit, licence and stars.",
      heading: "Alternatives",
      lede: "{count} tools that something in the catalog replaces.",
    },
    categories: {
      title: "Developer tool categories",
      description: "{count} categories of developer tools, each with its open-source options side by side.",
      heading: "Categories",
      lede: "{count} categories, from release automation to terminal emulators.",
    },
    languages: {
      title: "Developer tools by language",
      description: "Browse the catalog by the language each tool is written in, across {count} languages.",
      heading: "Languages",
      lede: "The language GitHub reports for each repository.",
    },
    licenses: {
      title: "Developer tools by licence",
      description: "Browse the catalog by licence, across {count} licences detected by GitHub.",
      heading: "Licences",
      lede: "The licence GitHub detects in each repository. Other means a licence file GitHub could not match to a known licence.",
    },
    owners: {
      title: "Who publishes the tools in the catalog",
      description: "The {count} GitHub accounts with more than one tool in awesome-alternatives.",
      heading: "Owners",
      lede: "{count} accounts publish more than one tool in the catalog. The rest publish one, linked from the tool itself.",
    },
    tools: {
      title: "Every tool in the catalog",
      description: "All {count} tools in awesome-alternatives, with language, licence, stars and latest release.",
      heading: "All tools",
      lede: "Every tool in the catalog, by name.",
    },
  },

  category: {
    context: "category",
    title: "{name}: {count} open-source tools",
    description: "{description} {count} tools compared by language, licence, stars and latest release.",
  },

  language: {
    context: "language",
    title: "Developer tools written in {name}",
    description: "{count} tools in the catalog written in {name}, with licence, stars and latest release.",
    lede: "Tools whose repository GitHub reports as mostly {name}.",
  },

  license: {
    context: "licence",
    title: "Developer tools under {name}",
    description: "{count} tools in the catalog licensed {name}, with language, stars and latest release.",
    lede: "Tools whose repository GitHub reports under the {name} licence.",
  },

  owner: {
    context: "owner",
    title: "Tools published by {name}",
    description: "{count} tools in the catalog owned by {name} on GitHub, with language, licence, stars and latest release.",
    lede: "Repositories owned by {name} on GitHub.",
    profile: "GitHub profile ↗",
    website: "Website ↗",
  },

  target: {
    title: "Alternatives to {name}",
    description:
      "{count} alternatives to {name}, in {languages}. Compare fit, licence, stars and the latest signed release.",
    context: "alternatives",
    contextTo: "to",
    archived: "archived",
    aboutLink: "About {name} →",
  },

  tool: {
    title: "{name}: {language} for {category}",
    titleFallbackLanguage: "tool",
    descriptionFallback: "{name} in the awesome-alternatives catalog.",
    alternativeTo: "alternative to",
    archived: "archived",
    aboutLabel: "About",
    owner: "Owner",
    archivedNote:
      "This repository is archived and no longer receives changes. It is listed so you can find what replaces it.",
    signed: "✓ signed",
    verified: "✓ verified",
    stars: "Stars",
    forks: "Forks",
    latest: "Latest",
    noRelease: "none",
    lastPush: "Last push",
    website: "Website ↗",
    edit: "Edit this entry",
  },

  contribute: {
    title: "Add a tool to awesome-alternatives",
    description:
      "How to list a developer tool in the catalog: the YAML entry, what CI checks, how maintainers verify their tool.",
    eyebrow: "Contribute",
    heading: "Add a tool",
    lede: "Every entry is a short YAML file in the repository. Write it yourself in a pull request, or describe the tool in an issue and a maintainer writes it for you.",
    openPullRequest: "Open a pull request ↗",
    suggest: "Suggest a tool instead ↗",
    guideInEnglish: "The guide below is in English, like the repository it describes.",
  },

  notFound: {
    title: "Not found",
    description: "This page is not in the catalog.",
    heading: "Not in the catalog",
    ledeBefore: "Nothing lives at this address. ",
    ledeSearch: "Search the catalog",
    ledeBetween: ", or ",
    ledeAdd: "add the tool",
    ledeAfter: " you were looking for.",
  },

  feed: {
    title: "awesome-alternatives: new tools",
    description: "Open-source alternatives newly added to the awesome-alternatives catalog.",
    joined: "{name} joined the catalog",
    replaces: "Replaces {names}.",
  },

  islands,
  pages,
};
