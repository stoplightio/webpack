import * as Config from 'webpack-chain';

export interface ICssOpts {
  postCssConfigPath?: string;
}

export const configureCss = (config: Config, opts: ICssOpts) => {
  const { postCssConfigPath } = opts;

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
    .end();

  if (postCssConfigPath) {
    config.module
      .rule('css')
      .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        config: {
          path: postCssConfigPath,
        },
      });
  }

  return config.module.rule('css');
};
