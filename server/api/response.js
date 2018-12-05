const err = (res, status, error) => {
    res.status(status);
    return res.json({ message: error.message || error });
};

module.exports = {
    unauthorised: (res, error) => {
        err(res, 403, error);
    },
    badRequest: (res, error) => {
        err(res, 400, error);
    },
    json: (res, data) => {
        res.status(200);
        res.json(data);
    },
    error: (res, error) => {
        err(res, 400, error);
    },
};
