/**
 * module import
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
/**
 * const variables init
 */
const { NODE_ENV } = process.env;
const production = 'production', development = 'development';
const isProduction = Object.is(NODE_ENV, production), isDevelopment = Object.is(NODE_ENV, development);
console.log(`check NODE_ENV: ${NODE_ENV}, isProduction: ${isProduction}, isDevelopment: ${isDevelopment}`)

/**
 * webpack dev server config
 */
const serverConfig = {
    compress: true,
    port: 9000
}

/**
 * webpack config mode
 * @returns ${production} or ${development}
 * @throws Error
 */
function getAndCheckWebpackMode() {
    if (isProduction) {
        return production;
    }
    throw new Error(`check the NODE_ENV, must be ${production}`);
}

/**
 * webpack config
 * entry,output,module,splitChunks...
 */
const webpackConfig = {
    mode: getAndCheckWebpackMode(),
    entry: {
        entry01: './entry-01/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name]-bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            {
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        ]
                    }
                }
            },
            {
                test: /\.m?(sa|sc|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './entry-01/template.html',
            filename: 'index.html',
            title: 'Hello World!',
            chunks: ['entry01']
        }),
        new MiniCssExtractPlugin({
            linkType: 'text/css',
            filename: '[name].contenthash.css',
            chunkFilename: '[id].contenthash.css'
        }),
    ],
    performance: {
        hints: "warning", // ??????
        maxAssetSize: 300000, // ????????????????????????????????????
        maxEntrypointSize: 500000, // ????????????????????????????????????
        assetFilter: function (assetFilename) {
            // ????????????????????????????????????
            // ?????????js???css?????????????????????
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: /@license/i,
                    },
                },
                extractComments: true,
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
                    name: "react",
                    chunks: "all"
                },
                commons: {
                    test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
                    name: 'commons',
                    chunks: 'all',
                },
            },
        },
    },
    devServer: serverConfig
};

module.exports = webpackConfig;