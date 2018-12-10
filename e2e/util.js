module.exports = {
    byTestID: id => `[data-test="${id}"]`,
    gotoMailinator(browser, email) {
        const target = email.replace('@mailinator.com', ''); // get the mailinator username
        // goto the inbox and wait for the content to be ready
        return browser.url(`https://www.mailinator.com/v3/index.jsp?zone=public&query=${target}#/#inboxpane`)
            .waitForElementVisible('#inboxpane');
    },
    clickFirstMailinatorMessage(browser) {
        // click the latest message in the inbox pane
        browser.waitForElementVisible('#inboxpane table tr td:nth-child(3n)')
            .click('#inboxpane table tr td:nth-child(3n)');
    },
    getMailinatorMessage(browser) {
        return browser.waitForElementVisible('#msg_body') // wait for the content to be ready
            .frame('msg_body') // switch to the message content's iframe
            .pause(1000); // the most reliable way I've found to ensure the content has loaded
    },
};