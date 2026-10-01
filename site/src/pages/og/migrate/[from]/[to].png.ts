import type { APIRoute, GetStaticPaths } from "astro";
import { nameOf } from "../../../../lib/catalog.ts";
import { migrationPairs } from "../../../../lib/migrationPages.ts";
import { migrationCard } from "../../../../lib/socialImage.ts";
import { renderSocialImage } from "../../../../lib/socialRender.ts";

export const getStaticPaths = (async () =>
  (await migrationPairs()).map((pair) => ({ params: pair }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const png = await renderSocialImage(migrationCard(nameOf(params.from ?? ""), nameOf(params.to ?? "")));
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
