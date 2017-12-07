const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve('./dist/example'),
    filename: './index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-image-render': path.resolve('./src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-image-render',
      filename: './index.html',
      templateContent: '<div id="app"/>'
    })
  ]
};
