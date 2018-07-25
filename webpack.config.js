
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      { test: /\.js$/, 
        use: [
        {
            loader : "babel-loader"
         },
        {
            loader: "eslint-loader",
            options:{
                fix: true
            }
    
        }
    ], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/ },
      { test: /\.scss$/, 
        use: [
        {
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: "sass-loader" // compiles Sass to CSS
        }
      ], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'css-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  mode: 'development'
};