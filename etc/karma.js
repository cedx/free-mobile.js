const {normalize, resolve} = require('path');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

/**
 * Resolves browser imports.
 * @return {object} A Rollup plugin resolving browser imports.
 */
function browserResolve() {
  return {
    name: 'browserResolve',
    resolveId: source => source == '../lib/index.js' ? resolve(__dirname, '../lib/browser.js') : null
  };
}

module.exports = config => config.set({
  basePath: resolve(__dirname, '..'),
  browsers: ['ChromeHeadless'],
  files: [
    {pattern: 'test/**/*.js', type: 'module'}
  ],
  frameworks: ['mocha'],
  preprocessors: {
    'test/**/*.js': ['rollup']
  },
  reporters: ['progress'],
  rollupPreprocessor: {
    onwarn: (warning, warn) => {
      if (warning.code == 'CIRCULAR_DEPENDENCY' && warning.importer.includes(normalize('node_modules/chai'))) return;
      warn(warning);
    },
    output: {format: 'iife', name: 'freeMobile'},
    plugins: [browserResolve(), nodeResolve(), commonjs()]
  },
  singleRun: true
});
