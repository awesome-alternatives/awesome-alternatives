---
reviewed: 2026-09-29
majors:
  gatsby: 5
  astro: 7
sources:
  - https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby/
---

## Compatibility

The official guide describes rebuilding the site in a new Astro project rather than converting it in place. Much carries over. `.astro` syntax is close to JSX, Markdown is built in and MDX comes through an integration, many existing Markdown plugins and npm dependencies keep working, and React components can be reused through the official React integration. Like Gatsby, Astro can produce a static site or render on the server, with prerendering per page.

## Before you switch

1. Create a project with `npm create astro@latest`, and copy the Gatsby files into a folder outside `src`. Add `@astrojs/react` to reuse React components and `@astrojs/mdx` for MDX files.
2. Delete Gatsby's `public/` folder (its build output), and rename `static/` to `public/`. Astro builds to `dist/`.
3. Move components, pages and the rest into `src/`. Pages go in `src/pages/`, where routing follows the file path.
4. Convert layouts first. Each Astro page needs its own `<html>`, `<head>` and `<body>`, so a shared layout carries them, with `<slot />` in place of `{children}`. Global CSS is imported in that layout instead of `gatsby-browser.js`.
5. Convert each `.js` page to an `.astro` page: keep only the `return()` as the template, move imports and logic into the `---` code fence, and read props from `Astro.props`. JSX page files cannot be used as pages.
6. Replace GraphQL queries with `import.meta.glob()`, or with `getCollection()` and `getEntry()` if you use content collections.
7. Repurpose the `gatsby-*.js` files: `siteMetadata` from `gatsby-config.js` goes into a data file such as `src/data/siteMetadata.js`, and an SSR setup from `gatsby-ssr.js` becomes an adapter in `astro.config.mjs`.

## Pitfalls

- **GraphQL is not included.** You can add it by hand, but the guide's route is to remove every query.
- `<Link to="">` becomes a plain `<a href="">`, `className` becomes `class`, and inline style objects become `style` attribute strings.
- CSS-in-JS libraries such as styled-components may need replacing.
- `<StaticImage />` and `<GatsbyImage />` become Astro's `<Image />`, which works in `.astro` and `.mdx` files only and has attributes that differ from Gatsby's. Local images in `.md` files must use Markdown syntax, not `<img>`, and `<img />` in React components is not optimized.
- `.astro` files and several other file types must be imported with their full extension.
- Markdown and MDX content outside `src/` has to move in, unless you use content collections. Existing files may need frontmatter changes, such as the `layout` property.
- End-to-end tests may pass unchanged only if the new markup matches the old site's.
