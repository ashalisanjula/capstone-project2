const mongoose = require('mongoose');
const appConfigs = require('./app-configs');

const connectMongo = () => {
    return mongoose.connect(appConfigs.dbConnectionString);
}

module.exports = mongoose;
module.exports = connectMongo;