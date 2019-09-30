const path = require('path');


module.exports = (env, argv) => {
  const DEBUG = argv.mode !== 'production';
  const config = {
    entry: {
      server: './src/server/index.js'
    },
    target: 'node',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  };
  if (DEBUG) config.devtool = 'inline-source-map';
  return config;
};
