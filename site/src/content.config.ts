import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const migrations = defineCollection({
  loader: glob({ pattern: "*.md", base: "../data/migrations" }),
  schema: z.object({
    reviewed: z
      .union([z.string(), z.date()])
      .transform((value) => (typeof value === "string" ? value : value.toISOString().slice(0, 10))),
    majors: z.record(z.string(), z.number().int().nonnegative()),
    sources: z.array(z.url()).min(1),
  }),
});

export const collections = { migrations };
