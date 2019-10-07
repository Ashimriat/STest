const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
  const DEBUG = argv.mode !== 'production';
  const config = {
    entry: {
      bundle: './src/index.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.vue', '.sass', '.scss', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                indentedSyntax: true,
              }
            }
          ]
        },
        {
          test: /\.mp4$/,
          loader: 'url-loader',
          options: {
            mimetype: 'video/mp4'
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new CopyPlugin([
        { from: 'src/index.html' }
      ])
    ]
  };
  if (DEBUG) {
    config.devtool = 'inline-source-map';
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    };
    config.devServer = {
      // contentBase: path.join(__dirname, 'dist'),
      inline: true,
      hot: true,
      publicPath: '/',
      filename: 'bundle.js',
    }
  }
  return config;
};
