const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
};

module.exports = merge([
    {
        output: {
            chunkFilename: '[name].[chunkhash:4].js',
            filename: '[name].[chunkhash:4].js'
        }
    },
    parts.clean(PATHS.build),
    parts.minifyJavascript(),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true
            }
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            // safe: true
        }
    }),
    parts.extractCSS({
        use: ['css-loader', 'sass-loader', parts.autoprefix()]
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true})
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: 'assets/images/[name].[hash:4].[ext]'
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
