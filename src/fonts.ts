import * as Config from 'webpack-chain';

export interface IFontsOpts {
  limit?: number;
}

export const configureFonts = (config: Config, opts: IFontsOpts) => {
  config.module
    .rule('fonts')
    .test(/\.(eot|ttf|svg|woff2?)$/)
    .use('fonts')
    .loader('url-loader')
    .options({
      limit: opts.limit || 10240,
    })
    .end();

  return config.module.rule('fonts');
};
