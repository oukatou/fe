const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require("path")

module.exports={
    mode: 'development',
    //mode: 'production',
    entry: {
        main:'./index.js'
    },
    output: {
        filename: '[name].[chunkhash:8].bundle.js',
        chunkFilename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules:[
            {
                test: /\.js/,
                loaders: 'babel-loader'
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].bundle.css',
            chunkFilename: '[name].[contenthash:8].css'
        }),
        new CleanWebpackPlugin()
    ],
    optimization:{
        runtimeChunk: 'single',
        splitChunks:{
            cacheGroups:{
                vender:{
                    name: 'vender',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 2
                },
                common: {
                    name: "common",
                    test: /[\\/]src[\\/]/,
                    chunks: "all",
                    priority: 1
                }
            }  
        }
    }
}