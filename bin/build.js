require('shelljs/global');

let webpack       = require('webpack'),
    webpackConfig = require('./webpack.prod.config');

console.log(
    '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
);

rm('-rf', webpackConfig.output.path);

webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
    process.stdout.write(stats.toString({
            colors      : true,
            modules     : false,
            children    : false,
            chunks      : false,
            chunkModules: false
        }) + '\n')
});
