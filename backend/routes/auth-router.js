const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth-controller');
// const {check, validationResult, body } = require('express-validator');
const isValidDate = require('../utils/formatters/date-formatter');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    
    if (!username) {
        res.status(400).json({sts: -1, error: 'username is required'});
    } else if (!email) {
        res.status(400).json.send({sts: -1, error: 'email is required'});
    } else if (!password) {
        res.status(400).json.send({sts: -1, error: 'password is required'});
    } else {
        authController.singup(req, res);
    }
});

router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        res.status(400).json({sts: -1, error: 'Email and password required'});
    } else {
        authController.signin(req, res);
    }
});

module.exports = router;