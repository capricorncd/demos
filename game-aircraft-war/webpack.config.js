/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-01-09 20:51:23
*/
const { resolve } = require('path')
const { ProgressPlugin, BannerPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// https://github.com/webpack-contrib/copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { formatDate } = require('date-utils-2020')
const pkg = require('./package.json')

const argsArr = process.argv.slice(2)

// console.log('process.argv', argsArr)

const isProd = argsArr.includes('production')

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: resolve(__dirname, './src/index.ts')
  },
  output: {
    path: resolve(__dirname, '../../capricorncd.github.io/demos/aircraft-war'),
    filename: '[name].js',
    libraryTarget: 'window',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    // umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '~': resolve('./')
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                // resolve('./assets/scss/constants.scss')
              ]
            }
          }
        ]
      },
      {
        test: /\.(pne?g|jpe?g|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(obj|stl|mtl)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/file/[name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),

  ]
}

module.exports = isProd
  // production
  ? merge(baseConfig, {
    plugins: [
      new CleanWebpackPlugin(),
      new BannerPlugin([
        `${pkg.name} v${pkg.version}`,
        `Author: ${pkg.author}`,
        `Repository: ${pkg.homepage}`,
        `Released on: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}`
      ].join('\n')),
      // https://github.com/webpack-contrib/copy-webpack-plugin
      new CopyWebpackPlugin({
        patterns: [{
          from: resolve(__dirname, './static'),
          to: 'static'
        }],
        options: {
          concurrency: 100
        }
      })
    ]
  })
  // development
  : merge(baseConfig, {
    devtool: 'inline-source-map',
    devServer: {
      // publicPath: './dist',
      host: '0.0.0.0',
      port: 4000
    },
    plugins: [
      // https://www.npmjs.com/package/eslint-webpack-plugin
      new EslintWebpackPlugin({
        extensions: ['ts', 'tsx', 'vue', 'js', 'jsx'],
        fix: true
      })
    ]
  })
