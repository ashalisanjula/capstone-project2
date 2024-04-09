const express = require('express')
const router = express.Router();
const workSpaceController = require('../controllers/workspace-controller');

router.post('/create', (req, res, next) => {
    let userId = req.body.userId;
    let name = req.body.name;
    
    if (!name) {
        res.status(400).json({sts: -1, error: 'Workspace name is required'});
    } else {
        workSpaceController.create(req, res);
    }
});

router.post('/createCollection', (req, res, next) => {
    let name = req.body.name;
    let workspaceId = req.body.workspaceId;
    
    if (!name) {
        res.status(400).json({sts: -1, error: 'Collection name is required'});
    } else if (!workspaceId) {
        res.status(400).json({sts: -1, error: 'Workspace ID is required'});
    } else {
        workSpaceController.createCollection(req, res, workspaceId);
    }
});

router.post('/createRequest', (req, res, next) => {
    let workspaceId = req.body.workspaceId;
    let collectionId = req.body.collectionId;
    let url = req.body.url;
    let reqMethod = req.body.reqMethod;

    if (!workspaceId) {
        res.status(400).json({sts: -1, error: 'Workspace ID required'});
    } else if (!collectionId) {
        res.status(400).json({sts: -1, error: 'Collection ID required'});
    } else if (!url) {
        res.status(400).json({sts: -1, error: 'URL is required'});
    } else if (!reqMethod) {
        res.status(400).json({sts: -1, error: 'Request method is required'});
    } else {
        workSpaceController.createRequest(req, res, workspaceId, collectionId);
    }
});

router.post('/createResponse', (req, res, next) => {
    let workspaceId = req.body.workspaceId;
    let collectionId = req.body.collectionId;
    let status = req.body.status;
    let resBody = req.body.resBody;
    let requestId = req.body.requestId;

    if (!workspaceId) {
        res.status(400).json({sts: -1, error: 'Workspace ID required'});
    } else if (!collectionId) {
        res.status(400).json({sts: -1, error: 'Collection ID required'});
    } else if (!status) {
        res.status(400).json({sts: -1, error: 'Status is required'});
    } else if (!resBody) {
        res.status(400).json({sts: -1, error: 'Response Body is required'});
    } else if (!requestId) {
        res.status(400).json({sts: -1, error: 'Requst ID is required'});
    } else {
        workSpaceController.createResponse(req, res, workspaceId, collectionId, requestId);
    }
});


router.post('/getWorkSpaces', (req, res, next) => {
    workSpaceController.getWorkSpaces(req, res);
});

router.post('/getWorkSpaceById', (req, res, next) => {
    workSpaceController.getWorkSpaceById(req, res);
});



module.exports = router;