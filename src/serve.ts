import * as webpack from 'webpack';
import * as Config from 'webpack-chain';

export interface IServeOpts {
  contentBase: string;
  hot?: boolean;
  port?: number;
  historyApiFallback?: boolean;
  skipOpen?: boolean;
}

export const configureServe = (config: Config, opts: IServeOpts) => {
  const { contentBase, hot = false, port = parseInt(process.env.PORT || '3300'), historyApiFallback, skipOpen } = opts;

  config.devServer.hot(hot).port(port);

  if (contentBase) config.devServer.contentBase(contentBase);
  if (historyApiFallback) config.devServer.historyApiFallback(historyApiFallback);

  // @ts-ignore
  if (!skipOpen) config.devServer.open(true);

  if (hot) {
    config.plugin('hot').use(webpack.HotModuleReplacementPlugin);
  }
};
