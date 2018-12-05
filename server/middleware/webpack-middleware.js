// Uses webpack dev + hot middleware

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack/webpack.config.dev');

const compiler = webpack(config);


module.exports = function (app) {
    const middleware = webpackDevMiddleware(compiler, {
        logLevel: 'warn',
        publicPath: config.output.publicPath,
    });
    middleware.waitUntilValid(() => {
        if (process.send) { // Running as child process (i.e. via tests)
            console.log('Sending completion of bundle to parent process');
            process.send({ done: true });
        }
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));

    return middleware;
};
