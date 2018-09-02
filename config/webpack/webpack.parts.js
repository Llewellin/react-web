const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'src'),
};

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true,
        overlay: true,
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
    // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: '[name].[contenthash:4].css',
    });

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,

                    use: [MiniCssExtractPlugin.loader].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin({ paths })],
});

exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => [require('autoprefixer')],
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: {
                    loader: 'url-loader',
                    options,
                },
            },
        ],
    },
});

exports.loadSVG = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: {
                    loader: 'file-loader',
                    options,
                },
            },
        ],
    },
});

exports.loadFont = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    },
                },
            },
        ],
    },
});

exports.loadJavascript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
});

exports.loadTypescript = () => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: [
                    '/node_modules/',
                    `${PATHS.app}/src/components/App/__tests__/*.tsx`,
                ],
            },
        ],
    },
});

exports.generateSourceMap = ({ type }) => ({
    devtool: type,
});

exports.clean = path => ({
    plugins: [new CleanWebpackPlugin(path)],
});

exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        }),
    ],
});

exports.copyFiles = ({ patterns, options } = {}) => ({
    plugins: [new CopyWebpackPlugin(...patterns, options)],
});

exports.minifyJavascript = () => ({
    optimization: {
        minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
    },
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});

exports.setFreeVariable = (key, value) => {
    return {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    key: JSON.stringify(value),
                },
            }),
        ],
    };
};

exports.passEnvironmentalVariable = () => {
    return {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    BUILD_VARIANT: JSON.stringify(process.env.BUILD_VARIANT),
                },
            }),
        ],
    };
};
