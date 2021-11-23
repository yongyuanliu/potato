/**
 * module import
 */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

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
    if (isDevelopment) {
        return development;
    }
    throw new Error(`check the NODE_ENV, must be ${production} or ${development} `)
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
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './entry-01/template.html',
            filename: 'index.html',
            title: 'Hello World!',
            chunks: ['entry01']
        })
    ],
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            // 只给出js与css文件的性能提示
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devServer: serverConfig
};

module.exports = webpackConfig;