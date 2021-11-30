const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
  entry: {
    main: "./src/js/index.js",
    userbase: "./src/js/userbase_index.js",
    //game_bullet: "./src/js/game_bullet.js",
    game: "./src/js/game.js",
    //game_enemy: "./src/js/game_enemy.js",
    //game_hero: "./src/js/game_hero.js",
    //game_loading: "./src/js/game_loading.js",
    //game_main: "./src/js/game_main.js",
    //game_space: "./src/js/game_space.js",
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
        /*(options:{
          publicPath: './src/img',
          name: '[name].[ext]'
        }*/
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
    //new webpack.ProgressPlugin(),

    new HTMLWebpackPlugin({
      filename: "mainpage.html",
      template: "./src/mainpage.html",
      chunks: ['main']
    }),
    new HTMLWebpackPlugin({
      filename: "interfaces.html", //otherwise index.html would be executed
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
      //chunkFilename: "index.css"
    }),
    new HTMLWebpackPlugin({
      filename: "game.html",
      template: "./src/game.html",
      chunks: ['game'] //,'game_bullet','game_enemy','game_hero','game_loading','game_main','game_space'
    }),
    //new CleanWebpackPlugin()
  ]
}