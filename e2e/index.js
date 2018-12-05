const fork = require('child_process').fork;

const server = fork('./server'); // launch the server

const email = `kyle-tutorial-${Date.now().valueOf()}@mailinator.com`;
const password = 'password';

module.exports = Object.assign(
    {
        before: (browser, done) => {
            // runs before all of the tests run, call done() when you're finished
            server.on('message', () => { // boot up the server which sends process.send({ done: true }); when ready
                done();
            });
        },
        after: (browser, done) => {
            // runs before all of the tests run, call done() when you're finished
            browser.end(); // kill the browser
            done(); // tell nightwatch we're done
            server.kill('SIGINT'); // kill the server
        },
    },
    // the main tests
    require('./register.test')(email, password),
    require('./login.test')(email, password),
);