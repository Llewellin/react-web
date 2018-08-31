const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src'),
};

module.exports = merge([
    {
        entry: `./src/index.tsx`,
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `./src/index.html`,
                filename: './index.html',
            }),
        ],
    },
    parts.loadTypescript(),
    parts.loadJavascript(),
]);
