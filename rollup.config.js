const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'lib/index.js',
  output: {file: 'build/free-mobile.js', format: 'iife', name: 'FreeMobile'},
  plugins: [commonjs()]
};
