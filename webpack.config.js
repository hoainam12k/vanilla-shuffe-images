const HtmlWebPackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        library: 'ShuffleImages',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: 'shuffleimages.js'
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { minimize: false }
              }
            ]
          }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html",
          inject: false
        }),
    ]
};