import { createConfig } from '../config';

test('createConfig defaults', () => {
  const config = createConfig({
    analyze: true,
    debug: true,
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
      html: {},
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
      workers: {},
    },
  });

  expect(config).toMatchSnapshot();
});
