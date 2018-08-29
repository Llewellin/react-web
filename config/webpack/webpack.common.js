const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

module.exports = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html'
            })
        ]
    },
    parts.loadJavascript()
]);
