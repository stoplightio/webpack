import * as Config from 'webpack-chain';
const webpack = require('webpack');

export interface IOptimizationOpts {
  minimize?: boolean;
  devSourceMap?: Config.DevTool;
  prodSourceMap?: Config.DevTool;
}

export const configureOptimizations = (config: Config, opts: IOptimizationOpts) => {
  const { minimize = true, devSourceMap = 'cheap-module-eval-source-map', prodSourceMap = 'source-map' } = opts;

  config.when(
    config.get('mode') === 'development',
    c => {
      if (devSourceMap) c.devtool(devSourceMap);

      c.optimization
        .removeAvailableModules(false)
        .removeEmptyChunks(false)
        // @ts-ignore
        .splitChunks(false)
        .end()
        .output.pathinfo(true)
        .end();
    },
    c => {
      if (prodSourceMap) c.devtool(prodSourceMap);

      c.plugin('hash').use(webpack.HashedModuleIdsPlugin);
      c.optimization.runtimeChunk('single');
      c.optimization.splitChunks({
        chunks: 'all',
      });
      c.optimization.minimize(minimize);
    }
  );
};
