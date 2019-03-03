import { createConfig } from '../config';

test('createConfig defaults', () => {
  const config = createConfig({
    analyze: true,
    plugins: {
      browserfs: {},
      bugsnag: {
        apiKey: '123',
        appVersion: '1.1',
        publicPath: '/foo/bar',
        releaseStage: 'development',
        srcDir: '/bar/foo',
      },
      css: {},
      html: {
        templatePath: '/foo',
      },
      javascript: {},
      monaco: {},
      optimizations: {},
      presentation: {
        name: 'stoplight',
      },
      public: {},
      serve: {
        hot: true,
      },
      stylus: {},
      typescript: {
        skipForkTs: true,
      },
      fonts: {},
      workers: {},
    },
  });

  // ci server will have a different absolute path, so don't include in snapshot
  delete config!.resolve!.alias!.bfsGlobal;
  // @ts-ignore
  delete config!.entry!.index;

  expect(config).toMatchSnapshot();
});
