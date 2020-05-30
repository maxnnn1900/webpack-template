const path = require('path')
const fs = require("fs");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
};

const PUG_ENABLE = true;

const PAGES_DIR = (PUG_ENABLE) ? `${PATHS.src}/pug/pages/` : `${PATHS.src}/html/`;

const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith((PUG_ENABLE) ? ".pug" : ".html"));
  
module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src,
    // example: `${PATHS.src}example.js`
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`, // имя берется из входного файла
    path: PATHS.dist,
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
    rules: [
    {
      test: /\.pug$/,
      loader: 'pug-loader',
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
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
      '~': PATHS.src,
      'vue$': 'vue/dist/vue.js',
    }
  },
  plugins: [
    new VueLoaderPlugin,
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`
    }),
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: (PUG_ENABLE) ? `./${page.replace(/\.pug/, '.html')}` : `./${page.replace(/\.pug/, '.html')}`
          // inject: false /* set true if js and css insert manually with ejs (https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs) */
        })
    ),
    new CopyWebpackPlugin ({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/static`, to: '' },
      ]
    }),
  ],
}