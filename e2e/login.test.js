const { byTestID } = require('./util');

module.exports = (email, password) => ({
    'Login': function (browser) {
        browser.url('http://localhost:8080')
            .waitForElementVisible(byTestID('login-email')) // wait for registration form
            .setValue(byTestID('login-email'), email) // set fields
            .setValue(byTestID('login-password'), password)
            .click(byTestID('login-submit')) // submit form
            .waitForElementVisible(byTestID('logged-in-page')); // wait for logged in page
    },
});