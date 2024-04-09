const Workspace = require('../models/workspace');
const Collection = require('../models/collection');
const Request = require('../models/request');
const Response = require('../models/response');
const appConfig = require('../app-configs');
const jwt = require('jsonwebtoken');

exports.handle = async (req, res) => {
    try {
        let token = req.header('Authorization');
        let decodedToken = jwt.verify(token, appConfig.jwtSecretKey);
        let userId = decodedToken.userId;
        let requestPath = req.params.requestPath;
        let collection = {}
        let request = {};
        let response = {};
        console.log(token);
        console.log(userId);

        if (!userId) {
            res.status(401).json({sts: -1, error: 'Unauthorized'})
        } else {
            let userWorkspaces = await Workspace.find({ownerId: userId});
            // console.log(userWorkspaces);
            userWorkspaces.forEach((ws) => {
                
                if (ws && ws.collections.length) {
                    ws.collections.forEach((col) => {
                        if (col && col.requests.length) {
                            col.requests.forEach((req) => {
                                if (req.url === requestPath) {
                                    request = req;
                                    collection = col;
                                }
                            })
                        }
                    })
                }
            })

            if (collection && collection.responses && request ) {
                collection.responses.forEach((res) => {
                    if (res.requestId === request._id.toString()) {
                        response = res;
                    }
         
                })
            }
            
            if (request && response) {

                let isRequestBodyOk = true;
                let receivedReqBody = req.body;
                let savedReqBody = request.reqBody[0];
                // console.log(receivedReqBody);
                // console.log(savedReqBody[0]);

                for (const [key, value] of Object.entries(savedReqBody)) {
                    if (!(receivedReqBody.hasOwnProperty(key) && receivedReqBody[key] === savedReqBody[key])) {
                        isRequestBodyOk = false;
                    }
                }
                
                if (isRequestBodyOk) {
                    console.log(response);
                    let status = response.status;
                    let resBodoy = response.resBody[0];
                    let resObj = {};

                    for (const [key, value] of Object.entries(resBodoy)) {
                        resObj[key] = value;
                    }

                    res.status(status).json(resObj);
                } else {
                    res.status(400).json({sts: -1, error: 'Invalid request body or params'})
                }

            } else {
                res.status(400).json({sts: -1, error: 'No requests or responsed found'})
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}
