module.exports = Object.assign(
    {
        before: (browser, done) => {
            // runs before all of the tests run
            done(); // tell nightwatch we're done after we have done all of our bootstrapping
        },
        after: (browser, done) => {
            // runs after all of the tests run
            browser.end(); // kill the browser
            done(); // tell nightwatch we're done
        },
    },
    // the main tests
    require('./register.test')(),
    require('./login.test')(),
);
