import * as Config from 'webpack-chain';
const { BugsnagBuildReporterPlugin, BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

export interface IBugsnagOpts {
  apiKey: string;
  appVersion: string;
  releaseStage: string;
  srcDir: string;
  publicPath: string;
}

export const configureBugsnag = (config: Config, opts: IBugsnagOpts) => {
  const { apiKey, appVersion, releaseStage, srcDir, publicPath } = opts;

  config.plugin('bugsnag-reporter').use(BugsnagBuildReporterPlugin, [
    {
      apiKey,
      appVersion,
      releaseStage,
      autoAssignRelease: true,
    },
    {
      logLevel: 'debug',
      path: srcDir,
    },
  ]);

  config.plugin('bugsnag-uploader').use(BugsnagSourceMapUploaderPlugin, [
    {
      apiKey,
      appVersion,
      publicPath,
      overwrite: true,
    },
  ]);

  return {
    reporter: config.plugin('bugsnag-reporter'),
    uploader: config.plugin('bugsnag-uploader'),
  };
};
