const path = require('path');
module.exports = {
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      watchContentBase: true,
    },
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
        
      ]
    },
};