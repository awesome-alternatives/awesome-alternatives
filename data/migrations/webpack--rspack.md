---
reviewed: 2026-09-29
majors:
  webpack: 5
  rspack: 2
sources:
  - https://rspack.rs/guide/migration/webpack
---

## Compatibility

Rspack's API and configuration align with webpack 5, and it supports most webpack configuration options, most built-in plugins (same names and parameters) and most loaders. The guide is written for webpack 5 projects: on webpack 4 or earlier, read webpack's own v4 to v5 guide for the differences, and Create React App or Vue CLI projects have their own guides.

## Before you switch

1. Check Node.js on every build machine, CI included. `@rspack/core@2` requires Node.js `^20.19.0 || >=22.12.0`.
2. Install `@rspack/core`, plus `@rspack/cli` and `@rspack/dev-server` if you used `webpack-cli` and `webpack-dev-server`. Keep `@rspack/core` and `@rspack/cli` on the same version.
3. Point your scripts at `rspack dev`, `rspack build` and `rspack preview`, and rename `webpack.config.js` to `rspack.config.js`, the file Rspack loads when none is given.
4. Take built-in plugins from `@rspack/core` instead of `webpack` (`new webpack.DefinePlugin` becomes `new rspack.DefinePlugin`), and replace ecosystem packages: `webpack-dev-middleware` becomes `@rspack/dev-middleware`, `webpack-chain` becomes `rspack-chain`, `webpack-merge` becomes `rspack-merge`.
5. Once the build works, remove `webpack`, `webpack-cli` and `webpack-dev-server`, unless a loader, plugin or script still imports `webpack` or `webpack/lib/*`.

## Pitfalls

- **Cache options have a different shape and cannot be copied.** `cache.type: 'filesystem'` becomes `'persistent'`, `buildDependencies` becomes a flat array of paths, top-level `snapshot` moves under `cache.snapshot`, and `cacheDirectory` and `cacheLocation` become `cache.storage.directory` and `cache.storage.location`.
- `cache: false` does not turn off the separate `incremental` option. Set `incremental: false` as well if you want no reuse between compilations.
- The CLI rejects `--progress`, `--color`, `--bail` and `--output-pathinfo` with an `Unknown option` error. Move that behaviour into the config.
- `resolve.plugins` is not supported, so `tsconfig-paths-webpack-plugin` gives way to `resolve.tsConfig`.
- Several community plugins have Rspack counterparts: `html-rspack-plugin`, `ts-checker-rspack-plugin`, `rspack.CopyRspackPlugin`, `rspack.CssExtractRspackPlugin`. Some packages, such as `webpack-node-externals`, need their latest version to work with Rspack.
- Setting `optimization.minimizer` yourself disables the default minimizers, so list both a JavaScript and a CSS minimizer.
- Vue 3 projects replace `vue-loader` with `rspack-vue-loader`.
