import * as Config from 'webpack-chain';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export interface IMonacoOpts {
  languages?: string[];
  features?: string[];
}

export const configureMonaco = (config: Config, opts: IMonacoOpts) => {
  try {
    require.resolve('monaco-editor');
  } catch (e) {
    console.warn('Cannot use monaco plugin. `monaco-editor` package is not installed');
    return;
  }

  // defining monaco as its own entry point breaks some of the async package loading
  // for example, language highlighting. with this uncommented try going to a json file, then a yaml file (note yaml not highlighted)
  // config
  //   .entry("editor")
  //   .add("monaco-editor")
  //   .end();

  config.resolve.alias.set('monaco-editor', 'monaco-editor/esm/vs/editor/editor.api.js');

  config.plugin('monaco').use(MonacoWebpackPlugin, [
    {
      languages: opts.languages || [
        // "apex",
        // "azcli",
        // "bat",
        // "clojure",
        // "coffee",
        // "cpp",
        // "csharp",
        // "csp",
        'css',
        // "dockerfile",
        // "fsharp",
        // "go",
        // "handlebars",
        'html',
        // "ini",
        // "java",
        'javascript',
        'json',
        // "less",
        // "lua",
        'markdown',
        // "msdax",
        // "mysql",
        // "objective",
        // "perl",
        // "pgsql",
        // "php",
        // "postiats",
        // "powerquery",
        // "powershell",
        // "pug",
        // "python",
        // "r",
        // "razor",
        // "redis",
        // "redshift",
        // "ruby",
        // "rust",
        // "sb",
        // "scheme",
        // "scss",
        // "shell",
        // "solidity",
        // "sql",
        // "st",
        // "swift",
        // "typescript",
        // "vb",
        'xml',
        'yaml',
      ],

      features: opts.features || [
        'accessibilityHelp',
        'bracketMatching',
        'caretOperations',
        'clipboard',
        'codeAction',
        'codelens',
        'colorDetector',
        'comment',
        // "contextmenu",
        'coreCommands',
        'cursorUndo',
        'dnd',
        'find',
        'folding',
        // "fontZoom",
        'format',
        // "goToDefinitionCommands",
        // "goToDefinitionMouse",
        'gotoError',
        'gotoLine',
        'hover',
        'inPlaceReplace',
        'inspectTokens',
        // "iPadShowKeyboard",
        'linesOperations',
        'links',
        'multicursor',
        'parameterHints',
        'quickCommand',
        // "quickOutline",
        'referenceSearch',
        'rename',
        'smartSelect',
        'snippets',
        'suggest',
        'toggleHighContrast',
        // "toggleTabFocusMode",
        'transpose',
        'wordHighlighter',
        'wordOperations',
        'wordPartOperations',
      ],
    },
  ]);

  return config.plugin('monaco');
};
