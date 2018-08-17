const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
};

module.exports = merge([
    parts.clean(PATHS.build),
    parts.extractCSS({
        use: ['css-loader', 'sass-loader', parts.autoprefix()]
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true})
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: 'assets/images/[name].[hash].[ext]'
        }
    }),
    parts.loadSVG({
        options: {
            name: 'assets/images/[name].[hash].[ext]'
        }
    }),
    parts.loadFont({
        options: {
            name: 'assets/fonts/[name].[hash].[ext]'
        }
    }),
    parts.generateSourceMap({type: 'source-map'}),
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'initial'
                    }
                }
            }
        }
    },
    parts.attachRevision()
]);
