var path       = require('path'),
    webpack    = require('webpack'),
    merge      = require('webpack-merge'),
    constans   = require('./constants'),
    baseConfig = require('./webpack.base.config.js');

var publicPath          = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = merge(baseConfig, {
    entry : {
        vendor: ['vue', 'vue-router', 'vue-resource'],
        app   : [path.resolve(constans.rootPath, 'src/index.js'), hotMiddlewareScript]
    },
    output: {
        publicPath   : publicPath,
        path         : path.resolve(constans.rootPath, 'dev'),
        filename     : 'js/[name].js',//[hash]表示hash值,[name]文件名
        chunkFilename: 'js/[id].js'
    }
});