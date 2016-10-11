const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  lazy: false,
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  }
}))

app.use(require('webpack-hot-middleware')(compiler))

app.listen(process.env.PORT || 8000)
