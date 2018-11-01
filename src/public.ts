import * as Config from 'webpack-chain';
const CopyWebpackPlugin = require('copy-webpack-plugin');

export interface IPublicOpts {
  publicDir: string;
}

export const configurePublic = (config: Config, opts: IPublicOpts) => {
  const { publicDir } = opts;

  config.plugin('public').use(CopyWebpackPlugin, [[publicDir]]);

  return config.plugin('public');
};
