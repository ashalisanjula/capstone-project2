const express = require('express');
const app = express();
const appConfig = require('./app-configs');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/auth-router');
const workspaceRouter = require('./routes/workspace-router');
const appRouter = require('./routes/app-router');
const connectMongo = require('./db-connect');
const bodyParser = require('body-parser');
const cors = require('cors')


app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.use(cors());

app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
});

app.use('/auth', authRouter);

app.use('/app', appRouter);

app.use('/', (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Token is required, Access denied' })
    } else {
        const decodedToken = jwt.verify(token, appConfig.jwtSecretKey);
        if (req.body.userId !== decodedToken.userId) {
            res.status(401).json({ error: 'Token is invalid, Access denied' })
        } else { 
            next();
        }
    }
})

app.use('/ws', workspaceRouter);

app.use((req, res, next) => { 
    res.status(404).json({sts: -1, error: 'Invalid URL or request method'});
});

connectMongo().then (() => {
    console.log(`Database Connected`); 
    let port = appConfig.connectionPort || 3000
    app.listen(port, () => {
        console.log(`Server is listening in port ${port}`);
    });
}).catch((error) => {
    console.log('Database connection failed', error);
})
