const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        alias:{
            '@':path.resolve(__dirname, 'src')
        }
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase:path.resolve(__dirname, 'dist'),
        compress:true,//gzip压缩
        port: 9090,
        open:true
    },

    module:{
        rules: [
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test:/\.(mp4|mp3)$/,
                exclude: /node_modules/,
                use:['file-loader']
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.fnt$/,
                exclude: /node_modules/,
                use:['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'口红机',
            inject:'body',
            template: './index.html',
            favicon: './status/favicon.ico',
            minify:true
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: { chunks: 'all' }
    }
};
