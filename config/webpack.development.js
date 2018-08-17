const merge = require('webpack-merge');
const path = require('path');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src')
};

module.exports = merge([
    parts.devServer({host: 'localhost', port: 7777}),
    parts.loadCSS(),
    parts.loadImages(),
    parts.loadSVG(),
    parts.loadFont({include: PATHS.app}),
    parts.generateSourceMap({type: 'source-map'})
]);
