const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {

  externals: {
    paths: PATH
  },

  entry: {
    app: PATH.src,
    // example: `${PATH.src}example.js`
  },
  output: {
    filename: `${PATH.assets}js/[name].[hash].js`, // имя берется из входного файла
    path: PATH.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, 
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, 
    {
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
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, 
    {
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
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }
  ]
  },
  resolve: {
    alias: {
      '~': PATH.src,
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATH.assets}css/[name].[hash].css`
    }),
    new HtmlWebpackPlugin ({
      hash: false,
      template: `${PATH.src}/index.html`,
      filename: './index.html',
      // inject: false /* set true if js and css insert manually with ejs (https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs) */
    }),
    new CopyWebpackPlugin ({
      patterns: [
        { from: `${PATH.src}/${PATH.assets}img`, to: `${PATH.assets}img` },
        { from: `${PATH.src}/${PATH.assets}fonts`, to: `${PATH.assets}fonts` },
        { from: `${PATH.src}/static`, to: '' },
      ]
    }),
  ],
}