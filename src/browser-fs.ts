import * as Config from 'webpack-chain';
const webpack = require('webpack');

export interface IBrowserFsOpts {
  // noop
}

export const configureBrowserFs = (config: Config, _opts: IBrowserFsOpts) => {
  try {
    require('browserfs');
  } catch (e) {
    // report warning?
  }

  config
    .entry('fs')
    .add('browserfs')
    .end()
    .module.noParse(/browserfs\.js/);

  config.node
    .set('dgram', 'empty')
    .set('fs', 'empty')
    .set('net', 'empty')
    .set('tls', 'empty')
    .set('child_process', 'empty')
    .set('Buffer', false);

  config.plugin('browserfs-provide').use(webpack.ProvidePlugin, [
    {
      BrowserFS: 'bfsGlobal',
      Buffer: 'bufferGlobal',

      // replacing the global process messes up monaco in the browser (shortcuts like cmd+a, the undo stack, and more)
      // process: "processGlobal",
    },
  ]);

  config.plugin('browserfs-define').use(webpack.DefinePlugin, [
    {
      'process.browser': true,
    },
  ]);

  config.resolve.alias
    .set('fs', 'browserfs/dist/shims/fs.js')
    .set('buffer', 'browserfs/dist/shims/buffer.js')
    .set('path', 'browserfs/dist/shims/path.js')
    .set('processGlobal', 'browserfs/dist/shims/process.js')
    .set('bufferGlobal', 'browserfs/dist/shims/bufferGlobal.js')
    .set('bfsGlobal', require.resolve('browserfs'));

  // see note above about process
  // .set("process", false)
};
