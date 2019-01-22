const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'lib/browser.js',
  output: {file: 'build/free-mobile.js', format: 'iife', name: 'freeMobile'},
  plugins: [nodeResolve(), commonjs()]
};
