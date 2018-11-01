import * as Config from 'webpack-chain';

export interface IWorkerOpts {
  // noop
}

export const configureWorkers = (config: Config, _opts: IWorkerOpts) => {
  const isDev = config.get('mode') === 'development';

  config.module
    .rule('web-worker')
    .test(/\.worker\.js$/)
    .use('worker-loader')
    .loader('worker-loader')
    .options({ inline: isDev, fallback: !isDev })
    .end();

  if (isDev) {
    // to fix an issue with undefined window global in web workers when HMR is on
    config.merge({
      output: {
        globalObject: 'this',
      },
    });
  }

  return config.module.rule('web-worker');
};
