var HtmlWebpackPlugin = require('html-webpack-plugin');

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
  plugins: [HTMLWebpackPluginConfig]
}