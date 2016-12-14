const path              = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      webpack           = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      merge             = require('webpack-merge'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');
const srcPath  = path.resolve(__dirname, '../src');
module.exports = {
    rootPath : rootPath,
    module   : {
        loaders: [
            {test: /\.html$/, loader: 'raw'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            // {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader?sourceMap')},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.vue$/, loader: 'vue'}
        ]
    },
    vue      : {
        loaders: {
            sass: ExtractTextPlugin.extract("css!sass?sourceMap"),
        }
    },
    resolve  : {
        extensions: ['', '.js', '.vue'],
        alias     : {
            'vue'       : path.resolve(rootPath, 'node_modules/vue/dist/vue.min.js'),
            'vue-router': path.resolve(rootPath, 'node_modules/vue-router/dist/vue-router.min.js'),
            'jquery'    : path.resolve(rootPath, 'node_modules/jquery/dist/jquery.slim.min.js'),
            'nm:'       : path.resolve(rootPath, 'node_modules'),
            'src:'      : srcPath
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
        new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(srcPath, 'index.html')
        })
    ]
};