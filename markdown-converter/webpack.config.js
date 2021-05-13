/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-24 15:44
 */
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    library: 'MarkdownConverter',
    libraryTarget: 'umd',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        text: /\.js$/,
        use: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
}
