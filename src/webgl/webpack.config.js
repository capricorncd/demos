/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-03-01 20:26:46
*/
const { resolve, join } = require('path')
const { ProgressPlugin, BannerPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { getIPAddress, getPageInput, createScript, createLinks } = require('./build/helpers')
const pages = require('./pages')

// https://github.com/webpack-contrib/copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { formatDate } = require('date-utils-2020')
const pkg = require('./package.json')

const args = JSON.parse(process.env.npm_config_argv).cooked

console.log('process.argv', args)

const page = pages[getPageInput(args)] || {}

const isProd = process.argv.slice(2).includes('production')

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: resolve(__dirname, page.entry
      ? page.entry
      : page.name ? `./src/${page.name}/index.ts` : './src/index.tsx')
  },
  output: {
    path: join(__dirname, '../../webgl', page.name || 'index'),
    filename: 'index.[hash:8].js',
    libraryTarget: 'window',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    // umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
    alias: {
      '@': resolve('./src')
    }
  },
  // https://webpack.js.org/configuration/externals/#externals
  externals: {
    PIXI: 'pixi.js',
    THREE: 'three',
    Vue: 'vue',
  },
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
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
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(pne?g|jpe?g|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          // fix: github
          // content-security-policy: default-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'self'
          // removed 'static/img' prefix that the github::content-security-policy error
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(obj|stl|mtl)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: {
      //       // js: 'babel-loader',
      //       less: ['style-loader', 'css-loader', 'less-loader']
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: page.title,
      template: 'index.html',
      filename: 'index.html',
      links: createLinks(page.links).join('\n'),
      scripts: createScript(page.scripts).join('\n'),
      inject: 'body',
    }),
    new VueLoaderPlugin(),
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
          from: join(__dirname, './static', page.name ? page.name + '/img' : 'index'),
          to: './'
        }],
        options: {
          concurrency: 100
        }
      }),
    ]
  })
  // development
  : merge(baseConfig, {
    devtool: 'inline-source-map',
    devServer: {
      // publicPath: './dist',
      host: getIPAddress(),
      port: 8000,
      contentBase: [
        join(__dirname, '/'),
        join(__dirname, 'static'),
      ]
    },
    plugins: [
      // https://www.npmjs.com/package/eslint-webpack-plugin
      new EslintWebpackPlugin({
        extensions: ['ts', 'tsx', 'js', 'jsx'],
        fix: true
      })
    ]
  })
