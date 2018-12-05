module.exports = {
    byTestID: id => `[data-test="${id}"]`,
    gotoMailinator(browser, email) {
        const target = email.replace('@mailinator.com', '');
        console.log(`https://www.mailinator.com/v3/index.jsp?zone=public&query=${target}#/#inboxpane`);
        return browser.url(`https://www.mailinator.com/v3/index.jsp?zone=public&query=${target}#/#inboxpane`)
            .waitForElementVisible('#inboxpane');
    },
    getMailinatorMessage(browser) {
        return browser.waitForElementVisible('#msg_body')
            .frame('msg_body')
            .pause(1000)
    },
};