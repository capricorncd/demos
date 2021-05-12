/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-24 15:44
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const baseConfig = require('./webpack.config')


module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9090,
    contentBase: path.join(__dirname, '/'),
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    open: true,
    hot: true,
    inline: true,
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}
