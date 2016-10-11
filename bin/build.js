const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')

const format = {
  chunks: false,
  chunkModules: false,
  colors: true
}

webpack(webpackConfig).run((err, stats) => {
  const jsonStats = stats.toJson()
  console.log(stats.toString(format))

  if (err) {
    console.error('Webpack compiler encountered a fatal error.', err)
  } else if (jsonStats.errors.length > 0) {
    console.error(
      'Webpack compiler encountered errors.',
      jsonStats.errors.join('\n')
    )
  } else if (jsonStats.warnings.length > 0) {
    console.warn(
      'Webpack compiler encountered warnings.',
      jsonStats.warnings.join('\n')
    )
  }
})
