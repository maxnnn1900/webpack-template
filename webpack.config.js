const path = require('path')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js', // имя берется из входного файла
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }]
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    disableHostCheck: true,
    overlay: true
  }
}