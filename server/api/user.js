const Router = require('express').Router;
const sgMail = require('@sendgrid/mail');

const { badRequest, json } = require('./response');
const { validEmail, GUID } = require('../utils');


const users = {

};

const confirmTokens = {

};

const getUser = (email) => {
    const user = users[email];
    if (!user) {
        return null;
    }
    const {
        password,
        ...rest
    } = user;
    return rest;
};

const createUser = (data = {}) => {
    const { email, password } = data;
    const user = email && users[email];
    return new Promise((resolve, reject) => {
        if (!validEmail(email)) {
            return reject(new Error('Please enter a valid email address'));
        }
        if (!password) {
            return reject(new Error('Please enter a password'));
        }
        if (user) {
            return reject(new Error(user.hasConfirmedEmail
                ? 'User already exists' : 'User already exists but has not confirmed their email address'));
        }

        const confirmToken = GUID();
        const id = GUID();

        confirmTokens[confirmToken] = email;
        users[email] = {
            ...user,
            id,
            hasConfirmedEmail: false,
        };
        const confirmURL = `http://localhost:8080/confirm-email/${confirmToken}`;
        const msg = {
            to: email,
            from: 'kyle@solidstategroup.com',
            subject: 'Please confirm your email address',
            html: `<strong>Please confirm your email address <a data-test="confirm-email" href="${confirmURL}">${confirmURL}</a></strong>`,
        };
        console.log('Sending email', email);
        sgMail.send(msg)
            .catch((err) => {
                console.log(err);
            });
        console.log('User created', confirmToken);
        resolve();
    });
};

const login = (data = {}) => {
    const { email, password } = data;
    const user = email && users[email];
    return new Promise((resolve, reject) => {
        if (!validEmail(email)) {
            return reject(new Error('Please enter a valid email address'));
        }
        if (!password) {
            return reject(new Error('Please enter a password'));
        }
        if (!user) {
            return reject(new Error('User not found'));
        }
        if (!user.hasConfirmedEmail) {
            return reject(new Error('Please confirm your email address'));
        }
        return resolve(getUser(email));
    });
};

const confirmEmail = token => new Promise((resolve, reject) => {
    const email = confirmTokens[token];
    if (email && users[email]) {
        delete confirmTokens[token];
        users[email].hasConfirmedEmail = true;
        return resolve(getUser(email));
    }
    return reject(new Error('The provided confirmation code was incorrect'));
});

module.exports = () => {
    const api = Router();

    api.post('/register', (req, res) => {
        const { email, password } = req.body;
        return createUser({ email, password })
            .then(() => json(res, { message: `An email has been sent to ${email}` }))
            .catch(error => badRequest(res, error));
    });

    api.post('/login', (req, res) => {
        const { email, password } = req.body;
        return login({ email, password })
            .then(user => json(res, user))
            .catch(error => badRequest(res, error));
    });

    api.get('/confirm-email/:confirmationToken', (req, res) => {
        const { confirmationToken } = req.params;
        return confirmEmail(confirmationToken)
            .then(user => json(res, user))
            .catch(error => badRequest(res, error));
    });

    return api;
};
