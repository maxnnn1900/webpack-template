const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATH = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

module.exports = {

  externals: {
    paths: PATH
  },

  entry: {
    app: PATH.src
  },
  output: {
    filename: `${PATH.assets}js/[name].js`, // имя берется из входного файла
    path: PATH.dist,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
        }
      ]
    }
  ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATH.assets}css/[name].css`
    })
  ],
}