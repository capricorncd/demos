/**
 * Create by Capricorncd
 * 2018/1/22 0022.
 * https://github.com/Capricorncd
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')

module.exports = merge(webpackBase, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 9003,
    overlay: {
      errors: true
    },
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ]
})
