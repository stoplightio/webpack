import * as Config from 'webpack-chain';
const HtmlWebpackPlugin = require('html-webpack-plugin');

export interface IHtmlOpts {
  templatePath?: string;
  env?: object;
  title?: string;
  metaHtml?: string;
  headHtml?: string;
  bodyHtml?: string;
}

export const configureHtml = (config: Config, opts: IHtmlOpts) => {
  const { templatePath, env = {}, title = '', metaHtml = '', headHtml = '', bodyHtml = '' } = opts;

  config.plugin('html').use(HtmlWebpackPlugin, [
    {
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
