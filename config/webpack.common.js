const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

module.exports = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'webpack demo'
            })
        ]
    },
    parts.loadJavascript()
]);
