const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const nodeExternals = require("webpack-node-externals");

module.exports = {
    target: 'electron-renderer',
    externals: [nodeExternals()],
    node: {
        __dirname: false,
        __filename: false
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: { minimize: true }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new HtmlWebPackPlugin({
            template: "./public/popout.html",
            filename: "./popout.html"
        })
    ],
    output: {
        path: __dirname + "/build"
    }
}