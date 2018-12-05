module.exports = () => ({
    'Registration - test page loads': function (browser) {
        browser.url('http://localhost:8080')
            .waitForElementVisible('body') // page load
    },
});