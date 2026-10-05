import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const isoDay = z
  .union([z.string(), z.date()])
  .transform((value) => (typeof value === "string" ? value : value.toISOString().slice(0, 10)));

const migrations = defineCollection({
  loader: glob({ pattern: "*.md", base: "../data/migrations" }),
  schema: z.object({
    reviewed: isoDay,
    majors: z.record(z.string(), z.number().int().nonnegative()),
    sources: z.array(z.url()).min(1),
  }),
});

const benchmarks = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "../data/benchmarks" }),
  schema: z.object({
    benchmarks: z
      .array(
        z.object({
          title: z.string(),
          url: z.url(),
          ranBy: z.string(),
          date: isoDay,
          result: z.string(),
        }),
      )
      .min(1),
  }),
});

export const collections = { migrations, benchmarks };
