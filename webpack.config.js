const webpack = require('webpack');
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

    mode: 'production',

    bail: true,

    devtool: false,

    performance: {
        maxEntrypointSize: 1000000,
    },

    entry: {
        'popup': './src/js/popup/index.js',
        'content': './src/js/content/index.js',
        'background': './src/js/background/index.js',
        'options': './src/js/options/index.js',
        'sandbox': './src/js/sandbox/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.less'],
        fallback: {
            buffer: require.resolve('buffer'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url'),
            timers: require.resolve('timers-browserify'),
            stream: require.resolve('stream-browserify'),
            dgram: false,
            fs: false,
            net: false,
            tls: false,
        },
    },

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: path.resolve(__dirname, '../src/js'),
            },
            {
                test: /\.js$/,
                use: [
                    'template-string-optimize-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env'],
                            plugins: [
                                [
                                    'component',
                                    {
                                        'libraryName': 'element-ui',
                                        'styleLibraryName': 'theme-chalk',
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                path: path.join(__dirname, 'postcss.config.js'),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                path: path.join(__dirname, 'postcss.config.js'),
                            },
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                path: path.join(__dirname, 'postcss.config.js'),
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    'limit': 40000,
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.(ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },

    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        // }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: '',
                },
            ],
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./src/assets/manifest.json').version),
        }),
    ],

};
