const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pluginConfig = require('../pluginrc.js')
// const distFolder = pluginConfig.destinationFolder
const distFolder = path.join(pluginConfig.destinationFolder, pluginConfig.extensionBundleId)
const srcFolder = pluginConfig.sourceFolder
const CLIENT_DIST_PATH = path.resolve(distFolder, 'client-dist')
const HTML_TEMPLATE_PATH = path.join(srcFolder, 'client-src/index.server.template.html')
const ENTRY_POINT_CLIENT_PATH = path.join(srcFolder, 'client-src/index.js')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer') // help tailwindcss to work


module.exports = ({
    mode: 'development',
    entry: ENTRY_POINT_CLIENT_PATH,
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['env', 'react', 'stage-2']
                }

            },
            // {
            //     test: /\.(woff|woff2|eot|ttf|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: 'fonts/[name].[ext]'
            //     }
            // },
            {
                test: /\.css$/i,
                include: srcFolder,
                // use: [
                //     MiniCssExtractPlugin.loader,
                //     {
                //         loader: "css-loader",
                //         options: {
                //             importLoaders: 2,
                //         }
                //     },
                //     {
                //         loader: 'postcss-loader', // postcss loader needed for tailwindcss
                //         options: {
                //           postcssOptions: {
                //             ident: 'postcss',
                //             plugins: [tailwindcss, autoprefixer],
                //           },
                //         },
                //     },
                // ],
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: CLIENT_DIST_PATH,
        publicPath: '',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: CLIENT_DIST_PATH
    },
    plugins: [
        // new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: HTML_TEMPLATE_PATH,
            filename: 'index.html',
            inject: 'body',
            title: 'HTML Webpack Plugin',
            bar: 'bar'
        })
    ]

})
