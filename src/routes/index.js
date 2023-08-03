const express = require('express');
const { login, connect2FA, verify2FA } = require('../controller/auth')
const router = express.Router();

const initAPI  = (app) => {
    router.post('/login', login);
    router.get('/connect-2fa', connect2FA);
    router.post('/verify-2fa', verify2FA);
    app.use('/', router);
}

module.exports = {
    initAPI
}