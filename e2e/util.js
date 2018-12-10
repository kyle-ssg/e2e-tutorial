module.exports = {
    byTestID: id => `[data-test="${id}"]`,
    gotoMailinator(browser, email) {
        const target = email.replace('@mailinator.com', ''); // get the mailinator username
        return browser.url(`https://www.mailinator.com/v3/index.jsp?zone=public&query=${target}#/#inboxpane`) // goto the
            .waitForElementVisible('#inboxpane');
    },
    clickFirstMailinatorMessage(browser) {
        browser.waitForElementVisible('#inboxpane table tr td:nth-child(3n)')
            .click('#inboxpane table tr td:nth-child(3n)');
    },
    getMailinatorMessage(browser) {
        return browser.waitForElementVisible('#msg_body')
            .frame('msg_body')
            .pause(1000);
    },
};