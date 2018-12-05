module.exports = () => ({
    'Registration - test page loads': function (browser) {
        browser.url('https://google.com')
            .waitForElementVisible('body') // page load
    },
});
