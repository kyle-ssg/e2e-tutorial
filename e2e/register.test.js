const { byTestID } = require('./util');

module.exports = (email, password) => ({
    'Registration - test page loads': function (browser) {
        browser.url('http://localhost:8080')
            .waitForElementVisible(byTestID('login-page')) // page load
            .click(byTestID('toggle-login')) // click toggle login
            .waitForElementVisible(byTestID('registration-email')) // wait for registration form
            .setValue(byTestID('registration-email'), email) // set fields
            .setValue(byTestID('registration-password'), password)
            .click(byTestID('registration-submit')) // submit form
            .waitForElementVisible(byTestID('check-email-page')); // wait for confirm email page
    },
});