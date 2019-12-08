import * as path from 'path';
import * as Config from 'webpack-chain';
const HtmlWebpackPlugin = require('html-webpack-plugin');

export interface IHtmlOpts {
  filename?: string;
  templatePath?: string;
  env?: object;
  title?: string;
  metaHtml?: string;
  headHtml?: string;
  bodyHtml?: string;
}

export const configureHtml = (config: Config, opts: IHtmlOpts) => {
  const {
    filename,
    templatePath = path.resolve(__dirname, 'index.html'),
    env = {},
    title = '',
    metaHtml = '',
    headHtml = '',
    bodyHtml = '',
  } = opts;

  config.plugin('html').use(HtmlWebpackPlugin, [
    {
      filename: filename || 'index.html',
      template: templatePath,
      env: JSON.stringify(env),
      title,
      metaHtml,
      headHtml,
      bodyHtml,
    },
  ]);

  return config.plugin('html');
};
