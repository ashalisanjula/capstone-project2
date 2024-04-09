const express = require('express')
const router = express.Router();
const appController = require('../controllers/app-controller');

router.all('/:requestPath', (req, res, next) => {
    let params = req.params;
    let token = req.header('Authorization');

    if (!params.requestPath) {
        res.status(400).json({sts: -1, error: 'Request path is required'});
    } else if (!token) {
        res.status(400).json({sts: -1, error: 'Access token is required in the Authorization Header'});
    } else {
        appController.handle(req, res);
    }
});




module.exports = router;