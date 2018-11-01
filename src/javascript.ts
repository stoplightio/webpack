import * as Config from 'webpack-chain';

export interface IJavascriptOpts {
  // noop
}

export const configureJavascript = (config: Config, _opts: IJavascriptOpts) => {
  config.resolve.extensions.add('.js');

  config.module
    .rule('compile-js')
    .test(/(\.js$)/)
    .exclude.add(/node_modules|\.min\./)
    .end()
    .use('cache')
    .loader('cache-loader')
    .end()
    .use('javascript')
    .loader('babel-loader')
    .end();

  return config.module.rule('compile-js');
};
