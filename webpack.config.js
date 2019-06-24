var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var cssName =
  process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName =
  process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

var plugins = [
  new MiniCssExtractPlugin({
    filename: 'public/css/' + cssName
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin(['dist/public/'], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = env => {
  if (env.platform === 'web' && env.NODE_ENV === 'production')
    plugins.push(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true
      })
    );
  return {
    entry: env.platform === 'server' ? './server.ts' : './src/client.ts',
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', 'jsx', '.ts', '.tsx']
    },
    plugins,
    output: {
      path: `${__dirname}/dist/`,
      filename: env.platform === 'server' ? 'server.js' : 'public/js/' + jsName,
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
        { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
        { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
        {
          test: /\.svg/,
          loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
        },
        { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader!eslint-loader',
          exclude: [/node_modules/, /public/]
        }
      ]
    },
    target: env.platform === 'server' ? 'node' : 'web',
    devtool: env.NODE_ENV !== 'production' ? 'source-map' : null,
    devServer: {
      contentBase: path.join(__dirname, 'dist/public'),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  };
};
