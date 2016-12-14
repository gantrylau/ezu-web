const path              = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      webpack           = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      merge             = require('webpack-merge'),
      constans          = require('./constants'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = constans.rootPath;
const srcPath  = constans.srcPath;
module.exports = {
    module   : {
        rules: [
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
                options: {
                    loaders: {
                        sass: ExtractTextPlugin.extract({
                            loader        : 'css-loader!sass-loader?sourceMap',
                            fallbackLoader: 'vue-style-loader'
                        })
                    }
                }
            },
            {test: /\.html$/, loader: 'html-loader'},
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/
            },
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader!css-loader!sass-loader?sourceMap')},
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    resolve  : {
        extensions: ['.js', '.vue'],
        alias     : {
            'vue'         : path.resolve(rootPath, 'node_modules/vue/dist/vue.min.js'),
            'vue-router'  : path.resolve(rootPath, 'node_modules/vue-router/dist/vue-router.min.js'),
            'vue-resource': path.resolve(rootPath, 'node_modules/vue-resource/dist/vue-resource.min.js'),
            'jquery'      : path.resolve(rootPath, 'node_modules/jquery/dist/jquery.slim.min.js'),
            'nm:'         : path.resolve(rootPath, 'node_modules'),
            'src:'        : srcPath
        }
    },
    externals: {},
    plugins  : [
        new CopyWebpackPlugin([
            {from: path.resolve(srcPath, 'assets'), to: 'assets'}
        ]),
        // new webpack.DllPlugin({
        //     path   : path.resolve(rootPath, 'bin/manifest.json'),
        //     name   : '[name]',
        //     context: __dirname,
        // }),
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        // }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(srcPath, 'index.html')
        })
    ]
};