const fork = require('child_process').fork;

module.exports = Object.assign(
    {
        before: (browser, done) => {
            done();
        },
        after: (browser, done) => {
            // runs before all of the tests run, call done() when you're finished
            browser.end(); // kill the browser
            done(); // tell nightwatch we're done
        },
    },
    // the main tests
    require('./register.test')(),
    require('./login.test')(),
);