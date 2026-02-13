import * as Config from 'webpack-chain';
const CopyWebpackPlugin = require('copy-webpack-plugin');

export interface IPublicOpts {
  publicDir: string;
}

export const configurePublic = (config: Config, opts: IPublicOpts) => {
  const { publicDir } = opts;

  const patterns = publicDir ? [{ from: publicDir }] : [];
  config.plugin('public').use(CopyWebpackPlugin, [patterns]);

  return config.plugin('public');
};
