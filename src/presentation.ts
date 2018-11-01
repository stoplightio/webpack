import * as Config from 'webpack-chain';
const WebpackBar = require('webpackbar');

export interface IPresentationOpts {
  name: string;
  profile?: boolean;
}

export const configurePresentation = (config: Config, opts: IPresentationOpts) => {
  const { name, profile } = opts;

  config.plugin('webpackBar').use(WebpackBar, [
    {
      name,
      // useful for debugging, when needed
      profile,
    },
  ]);

  return config.plugin('webpackBar');
};
