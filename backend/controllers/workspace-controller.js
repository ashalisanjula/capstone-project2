const Workspace = require('../models/workspace');
const Collection = require('../models/collection');
const Request = require('../models/request');
const Response = require('../models/response');
const appConfig = require('../app-configs');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    try {
        let ws = new Workspace({
            name: req.body.name,
            ownerId: req.body.userId
        });
    
        let savedDoc = await ws.save();
    
        if (savedDoc) {
            res.status(200).json({sts: 1, workspace: savedDoc});
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}

exports.createCollection = async (req, res, workspaceId) => {
    try {
        let workspace = await Workspace.findById(workspaceId);

        if (workspace) {
            let collections = workspace.collections;
            let collection = new Collection({
                name: req.body.name,
                workspaceId: workspaceId
            })
    
            collections.push(collection);
    
            let updatedWorkspace = await Workspace.findByIdAndUpdate({_id: workspaceId}, {collections: collections})
    
            if (updatedWorkspace) {
                res.status(200).json({sts: 1});
            } else {
                console.log(error);
                res.status(500).json({sts: -1, error: 'Internal Server Error'})
            }
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
}

exports.createRequest = async (req, res, workspaceId, collectionId) => {
    try {

        let workspace = await Workspace.findById(workspaceId);
        let token = jwt.sign({userId: req.body.userId}, appConfig.jwtSecretKey);

        if (workspace) {
            let collections = workspace.collections;
            let collection = collections.find((col) => {
                return col._id.toString() === collectionId
            });

            if (collection) {
                let requests = collection.requests;
                console.log(req.body.reqBody);
                let request = new Request({
                    name: req.body.name,
                    collectionId: collectionId,
                    url: req.body.url,
                    reqMethod: req.body.reqMethod,
                    reqParams: req.body.reqParams,
                    reqBody: req.body.reqBody,
                    token: token
                })

                requests.push(request);
                collection.requests = requests;
            }

            let updatedWorkspace = await Workspace.findByIdAndUpdate({_id: workspaceId}, {collections: collections})

            if (updatedWorkspace) {
                res.status(200).json({sts: 1, token: token});
            } else {
                console.log(error);
                res.status(500).json({sts: -1, error: 'Internal Server Error'})
            }
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
}

exports.createResponse = async (req, res, workspaceId, collectionId, requestId) => {
    try {

        let workspace = await Workspace.findById(workspaceId);

        if (workspace) {
            let collections = workspace.collections;
            let collection = collections.find((col) => {
                return col._id.toString() === collectionId
            });

            if (collection) {
                let requests = collection.requests;

                let request = requests.find((req) => {
                    return req._id.toString() === requestId
                });

                if (request) {
                    let response = new Response({
                        status: req.body.status,
                        resBody: req.body.resBody,
                        requestId: request._id.toString()
                    });

                    let responses = collection.responses;
                    responses.push(response);

                    collection.responses = responses;
                }
            }

            let updatedWorkspace = await Workspace.findByIdAndUpdate({_id: workspaceId}, {collections: collections})

            if (updatedWorkspace) {
                res.status(200).json({sts: 1});
            } else {
                console.log(error);
                res.status(500).json({sts: -1, error: 'Internal Server Error'})
            }
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
}

exports.getWorkSpaces = async (req, res) => {
    try {

        let ownerId = req.body.userId;
        let workspaces = await Workspace.find({ ownerId: ownerId });
        if (workspaces) {
            res.status(200).json({sts: 1, workspaces: workspaces});
        } 

    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}

exports.getWorkSpaceById = async (req, res) => {
    try {

        let ownerId = req.body.userId;
        let wsId = req.body.wsId;
        let workspace = await Workspace.find({ _id: wsId, ownerId: ownerId});
        if (workspace) {
            res.status(200).json({sts: 1, workspaces: workspace});
        } else {
            res.status(400).json({sts: -1, error: 'No workspace found with Id'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}