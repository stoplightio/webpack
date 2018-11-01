import * as Config from 'webpack-chain';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export interface ITypescriptOpts {
  parseJS?: boolean;
  useBabel?: boolean;
}

export const configureTypescript = (config: Config, opts: ITypescriptOpts) => {
  const { parseJS, useBabel } = opts;

  const ruleName = 'compile-ts';
  let tester = /(\.ts(x?)$)/;
  if (parseJS || useBabel) {
    tester = /(\.js$|\.ts(x?)$)/;
    config.resolve.extensions.add('.js');
  }

  config.resolve.extensions.add('.tsx').add('.ts');
  config.plugin('fork-ts').use(ForkTsCheckerWebpackPlugin, [{ checkSyntacticErrors: true }]);

  config.module
    .rule(ruleName)
    .test(tester)
    .exclude.add(/node_modules|\.min\./)
    .end()
    .use('cache')
    .loader('cache-loader')
    .end();

  if (useBabel) {
    config.module
      .rule(ruleName)
      .use('javascript')
      .loader('babel-loader')
      .end();
  }

  config.module
    .rule(ruleName)
    .use('typescript')
    .loader('ts-loader')
    .options({
      experimentalFileCaching: true,
      experimentalWatchApi: true,
      onlyCompileBundledFiles: true,
      transpileOnly: true,
    })
    .end();

  return config.module.rule(ruleName);
};
