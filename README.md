# Webpack Helpers

[![Maintainability](https://api.codeclimate.com/v1/badges/42f95e29a1fba71d1387/maintainability)](https://codeclimate.com/github/stoplightio/webpack/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/42f95e29a1fba71d1387/test_coverage)](https://codeclimate.com/github/stoplightio/webpack/test_coverage)

These helpers are meant to make creating webpack configs easier.

Available "plugins":

- BrowserFS: Replace the native `fs` module with the BrowserFS equivalent.
- Bugsnag: Upload sourcemaps to bugsnag.
- CSS: Import css.
- HTML: Render an html template.
- Javascript: Parse javascript.
- Monaco: Import monaco.
- Optimizations: Minification, chunks, etc.
- Presentation: Better terminal output.
- Public: Use a public assets folder.
- Serve: Serve up a hot reloading dev environment.
- Stylus: Import stylus.
- Typescript: Parse typescript (and optionally also javascript).
- Web Workers: Import web workers.

### Example

In your `webpack.config.ts` file:

```ts
import { createConfig } from "@stoplight/webpack";
import * as path from "path";
import webpack from "webpack";

import { buildEnv } from "./env";

const isElectron = process.env.RUN_CONTEXT === "desktop";

const config: webpack.Configuration = createConfig({
  srcDir: path.resolve(process.cwd(), "src"),
  distDir: isElectron
    ? path.resolve(process.cwd(), "desktop", "src", "dist")
    : path.resolve("desktop", "src", "dist"),
  publicDir: path.resolve(process.cwd(), "src", "public"),
  isElectron,
  analyze: false,
  debug: false,
  stats: undefined,
  plugins: {
    browserfs: isElectron ? undefined : {},
    bugsnag: undefined,
    css: undefined,
    html: {
      // string to assign to the head title tag
      title: "Stoplight Studio",

      // object to assign to window.env in a head tag script
      env: buildEnv(),

      // string of html to be inserted towards the top of the head tag
      metaHtml: "",

      // string of html to be inserted towards the bottom of the head tag
      headHtml: "",

      // string of html to be inserted towards the bottom of the body tag
      bodyHtml: ""
    },
    javascript: undefined,
    monaco: {},
    optimizations: {},
    presentation: {},
    public: undefined,
    serve: {},
    stylus: undefined,
    typescript: {},
    workers: undefined
  },
  onBeforeBuild: _config => {
    // ...do whatever you want w config, which is an instance of webpack-chain
  }
});

export default config;
```
