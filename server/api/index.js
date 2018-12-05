const Router = require('express').Router;
const user = require('./user');

module.exports = () => {
    const api = Router();

    api.get('/', (req, res) => {
        res.json({ message: 'API is up and running!' });
    });

    api.use('/user', user());

    return api;
};
