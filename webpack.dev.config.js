var HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
  
// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: 'index.html' });

module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
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
  node: {
    __dirname: false
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.DefinePlugin(envKeys)]
}