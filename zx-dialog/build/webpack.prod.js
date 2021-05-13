/**
 * Create by capricorncd
 * 2018/1/22 0022.
 * https://github.com/capricorncd
 */
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBase = require('./webpack.base')
const banner = require('./banner')
const pkg = require('../package.json')

module.exports = merge(webpackBase, {
  mode: 'production',
  output: {
    filename: 'js/[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'webpack-replace-loader',
        include: path.resolve(__dirname, '../src'),
        options: {
          arr: [
            { search: '__VERSION__', replace: pkg.version }
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
})
