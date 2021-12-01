const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/js/index.js",
    userbase: "./src/js/userbase_index.js",
    game: "./src/js/game.js",
  },

  output: {
    filename: "[name]_bundle.js",
    path: path.resolve("dist"),
    publicPath: "/",
  },

  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], //,"style-loader"
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader',//'file-loader', 
        options: {
          esModule: false,
          //outputPath: './img',
          name: '[name].[ext]',
        },
      },
      /*{
        test: /\.scss$/,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },*/
    ], 
  },

  plugins: [

    new HTMLWebpackPlugin({
      filename: "mainpage.html",
      template: "./src/mainpage.html",
      chunks: ['main']
    }),
    new HTMLWebpackPlugin({
      filename: "interfaces.html", 
      template: "./src/interfaces.html",
      chunks: ['main']
    }),
    new HTMLWebpackPlugin({
      filename: "signup.html",
      template: "./src/signup.html",
      chunks: ['main','userbase']
    }),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new HTMLWebpackPlugin({
      filename: "game.html",
      template: "./src/game.html",
      chunks: ['game']
    }),

  ]
}