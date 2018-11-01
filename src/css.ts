import * as Config from 'webpack-chain';
const path = require('path');

export interface ICssOpts {
  // noop
}

export const configureCss = (config: Config, _opts: ICssOpts) => {
  config.resolve.extensions.add('.css');

  config.module
    .rule('css')
    .test(/\.css$/)
    .use('css-style')
    .loader('style-loader')
    .end()
    .use('css-loader')
    .loader('css-loader')
    .options({
      importLoaders: 1,
    })
    .end()
    .use('postcss-loader')
    .loader('postcss-loader')
    .options({
      config: {
        path: path.resolve(__dirname, '..', 'postcss.config.js'),
      },
    });

  return config.module.rule('css');
};
