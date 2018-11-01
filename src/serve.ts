const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const webpackServeWaitpage = require('webpack-serve-waitpage');
import * as webpack from 'webpack';

const port = process.env.PORT;

export interface IServeOpts {
  publicDir: string;
}

export const configureServe = (builtConfig: webpack.Configuration, opts: IServeOpts) => {
  const { publicDir } = opts;

  // configure the development server
  // @ts-ignore
  builtConfig.serve = {
    port,
    content: publicDir,
    hotClient: {
      validTargets: ['web', 'electron-renderer'],
    },
    add: (app: any, _middleware: any, options: any) => {
      app.use(webpackServeWaitpage(options));
      app.use(
        convert(
          history({
            // ... see: https://github.com/bripkens/connect-history-api-fallback#options
          })
        )
      );
    },
    // TODO: not working for some reason...
    // on: {
    //   listening: () => {
    //     execSync('ps cax | grep "Google Chrome"');
    //     execSync(
    //       `osascript chrome.applescript "${encodeURI(`localhost:${port}`)}"`,
    //       {
    //         cwd: __dirname,
    //         stdio: "ignore"
    //       }
    //     );
    //   }
    // }
  };
};
