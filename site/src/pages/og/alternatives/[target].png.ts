import type { APIRoute, GetStaticPaths } from "astro";
import { type Target, targets } from "../../../lib/catalog.ts";
import { alternativesCard } from "../../../lib/socialImage.ts";
import { renderSocialImage } from "../../../lib/socialRender.ts";

export const getStaticPaths = (() =>
  targets().map((target) => ({ params: { target: target.slug }, props: { target } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ target: Target }> = async ({ props: { target } }) => {
  const names = [...target.alternatives].sort((a, b) => b.repo.stars - a.repo.stars).map((tool) => tool.name);
  const png = await renderSocialImage(alternativesCard(target.name, names));
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
