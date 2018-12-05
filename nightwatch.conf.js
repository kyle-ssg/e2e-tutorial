const chromedriver = require('chromedriver');
const seleniumServer = require('selenium-server');
const os = require('os');

const browserSize = 'window-size=1024x1536';

module.exports = {

    'selenium': {
        'start_process': true, // tells nightwatch to start/stop the selenium process
        'server_path': seleniumServer.path,
        'cli_args': {
            'webdriver.chrome.driver': chromedriver.path, // chromedriver from our npm module
        },
    },

    'test_settings': {
        'end_session_on_fail': false, // don't close the browser straight away on fail in case we want to check the state
        'default': {
            'desiredCapabilities': {
                'browserName': 'chrome', // Run the e2e test in chrome
                'chromeOptions': {
                    // In linux we pass a few more arguments
                    'args': os.platform() === 'linux' ? ['headless', 'no-sandbox', browserSize] : [browserSize],
                },
            },
            'globals': {
                'waitForConditionTimeout': 5000, // global default time to wait for element to exist.
            },
        },
    },
};