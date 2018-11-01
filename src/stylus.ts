import * as Config from 'webpack-chain';

export interface IStylusOpts {
  // noop
}

export const configureStylus = (config: Config, _opts: IStylusOpts) => {
  config.resolve.extensions.add('.stylus');

  config.module
    .rule('stylus')
    .test(/\.styl$/)
    .use('stylus-style')
    .loader('style-loader')
    .end()
    .use('stylus-css-loader')
    .loader('css-loader')
    .end()
    .use('stylus-loader')
    .loader('stylus-loader');

  return config.module.rule('stylus');
};
