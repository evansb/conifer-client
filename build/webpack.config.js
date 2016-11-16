'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin

// Build Configuration
const bundleName = process.argv[2] || 'cs1101s'
const bundleBase = path.join(process.cwd(), 'examples', bundleName)
const bundleTemplate = path.join(bundleBase, 'index.html')
const bundleIndex = path.join(bundleBase, 'index.ts')

const isDevelopment = process.env.NODE_ENV === 'development'

let styleLoaders = [
  { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
  { test: /\.css$/, loaders: ['style', 'css'] },
]

if (!isDevelopment) {
  styleLoaders = styleLoaders.map(loader => {
    loader.loaders.shift()
    loader.loader = ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: loader.loaders
    })
    delete loader.loaders
    return loader
  })
}

const baseConfig = {
  name: 'conifer',
  entry: {
    [bundleName]: [ bundleIndex ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  output: {
    filename: 'conifer.min.js',
    path: path.join(process.cwd(), 'dist', bundleName),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' }
    ].concat(styleLoaders)
  },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      'NODE_ENV': process.env.NODE_ENV,
      __DEV__: process.env.NODE_ENV === 'development'
    }),
    new HtmlWebpackPlugin({
      template: bundleTemplate,
      hash: false,
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, '../node_modules')
          ]
        }
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

const envConfig = isDevelopment
  ? require('./webpack.config.dev')
  : require('./webpack.config.prod')

const webpackConfig = merge(baseConfig, envConfig)

if (isDevelopment) {
  webpackConfig.entry[bundleName].unshift('webpack-hot-middleware/client')
}

module.exports = webpackConfig
