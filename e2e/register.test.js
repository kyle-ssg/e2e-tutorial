const { byTestID, gotoMailinator, getMailinatorMessage } = require('./util');

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
    'Registration - Confirm email': function (browser) {
        gotoMailinator(browser, email); // click first mailinator email
        browser.waitForElementVisible('#inboxpane table tr td:nth-child(3n)')
            .click('#inboxpane table tr td:nth-child(3n)');

        getMailinatorMessage(browser) // get the message content
            .getAttribute('a[target="_other"]', 'href', // get the first anchor and go to that url
                result => browser.url(result.value))
            .waitForElementVisible(byTestID('logged-in-page')); // wait for logged in page
    },
});