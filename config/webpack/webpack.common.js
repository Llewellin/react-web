const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

module.exports = merge([
    {
        entry: `./src/index.js`,
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `./src/index.html`,
                filename: './index.html',
            }),
        ],
        // hide webpack warnings - There are multiple modules with names that only differ in casing.
        // This warning make no sense
        stats: 'errors-only',
    },
    // parts.loadTypescript(),
    parts.loadJavascript(),
    parts.passEnvironmentalVariable(),
]);
