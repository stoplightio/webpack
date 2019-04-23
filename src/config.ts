import { default as CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
// @ts-ignore
import * as BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import * as Config from 'webpack-chain';

import * as browserfs from './browser-fs';
import * as bugsnag from './bugsnag';
import * as css from './css';
import * as fonts from './fonts';
import * as html from './html';
import * as javascript from './javascript';
import * as monaco from './monaco';
import * as optimizations from './optimizations';
import * as presentation from './presentation';
import * as publicPlugin from './public';
import * as serve from './serve';
import * as stylus from './stylus';
import * as typescript from './typescript';
import * as workers from './workers';

export interface IConfigOpts {
  srcFile?: string;
  srcDir?: string;
  distDir?: string;
  publicDir?: string;
  envName?: string;
  isElectron?: boolean;
  analyze?: boolean;
  debug?: boolean;
  watchOptions?: webpack.ICompiler.WatchOptions;
  stats?: webpack.Stats.ToStringOptions;
  onBeforeBuild?: (config: Config) => void;
  plugins?: {
    browserfs?: browserfs.IBrowserFsOpts;
    bugsnag?: bugsnag.IBugsnagOpts;
    css?: css.ICssOpts;
    fonts?: fonts.IFontsOpts;
    html?: html.IHtmlOpts;
    javascript?: javascript.IJavascriptOpts;
    monaco?: monaco.IMonacoOpts;
    optimizations?: optimizations.IOptimizationOpts;
    presentation?: presentation.IPresentationOpts;
    public?: Partial<publicPlugin.IPublicOpts>;
    serve?: Partial<serve.IServeOpts>;
    stylus?: stylus.IStylusOpts;
    typescript?: typescript.ITypescriptOpts;
    workers?: workers.IWorkerOpts;
  };
}

export const createConfig = (opts: IConfigOpts = {}) => {
  const config = new Config();

  const {
    srcDir = '',
    srcFile = 'index.tsx',
    distDir,
    publicDir = '',
    envName = process.env.NODE_ENV || 'development',
    analyze,
    debug,
    isElectron = false,
    watchOptions = {},
    onBeforeBuild,
    plugins = {},
    stats,
  } = opts;

  config
    // @ts-ignore
    .mode(envName);

  if (srcDir || srcFile) {
    config
      .entry('index')
      .add(path.resolve(srcDir, srcFile))
      .end()
      .output.filename('[name].[hash].js')
      .end()
      .resolve.extensions.add('.js')
      .add('.json');
  }

  config.watchOptions({ ignored: /node_modules|dist/, ...watchOptions });

  config.when(
    isElectron,
    c => {
      c.target('electron-renderer');
      if (distDir) {
        c.output.path(distDir);
        c.plugin('clean').use(CleanWebpackPlugin);
      }
    },
    c => {
      if (distDir) {
        c.output.path(distDir).publicPath('/');
        c.plugin('clean').use(CleanWebpackPlugin);
      }
    }
  );

  if (plugins.browserfs) browserfs.configureBrowserFs(config, plugins.browserfs);
  if (plugins.bugsnag) bugsnag.configureBugsnag(config, plugins.bugsnag);
  if (plugins.css) css.configureCss(config, plugins.css);
  if (plugins.fonts) fonts.configureFonts(config, plugins.fonts);
  if (plugins.html) html.configureHtml(config, plugins.html);
  if (plugins.javascript) javascript.configureJavascript(config, plugins.javascript);
  if (plugins.monaco) monaco.configureMonaco(config, plugins.monaco);
  if (plugins.optimizations) optimizations.configureOptimizations(config, plugins.optimizations);
  if (plugins.presentation) presentation.configurePresentation(config, plugins.presentation);
  if (plugins.public)
    publicPlugin.configurePublic(config, {
      publicDir,
      ...plugins.public,
    });
  if (plugins.stylus) stylus.configureStylus(config, plugins.stylus);
  if (plugins.typescript) typescript.configureTypescript(config, plugins.typescript);
  if (plugins.workers) workers.configureWorkers(config, plugins.workers);
  if (plugins.stylus) stylus.configureStylus(config, plugins.stylus);
  if (plugins.serve)
    serve.configureServe(config, {
      contentBase: publicDir,
      ...plugins.serve,
    });

  // when needed, to analyze resulting bundle
  if (analyze) {
    config.plugin('analyzer').use(BundleAnalyzerPlugin);
  }

  // to log out extra info, when needed
  if (stats) {
    config.stats(stats);
  }

  // give the user a hook to modify before building
  if (onBeforeBuild) {
    onBeforeBuild(config);
  }

  const builtConfig = config.toConfig();

  // meh, not too useful so turning off
  builtConfig.performance = undefined;

  // Log out config, when needed
  if (debug) {
    console.log('------------------- Webpack Chain Config');
    console.log(config.toString());
    console.log('------------------- Built Config');
    console.log(builtConfig);
  }

  return builtConfig;
};
