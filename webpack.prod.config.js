var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const env = dotenv.config().parsed;
  
// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

var DefinePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: 'index.html' });
var UglifyPlugin = new Webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }});
var DedupePlugin = new Webpack.optimize.DedupePlugin();
var CommonChunksPlugin = new Webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] });

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './app.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ],
    rules: [
        {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                name: 'images/[hash]-[name].[ext]',
                },
            },
            ],
        },
    ],
  },
  plugins: [DefinePlugin, HTMLWebpackPluginConfig, UglifyPlugin, DedupePlugin, CommonChunksPlugin, new webpack.DefinePlugin(envKeys)]
}