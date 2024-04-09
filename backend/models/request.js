const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    name: {type: String, trim: true, required: true},
    collectionId: {type: String, trim: true, required: true},
    url: {type: String, trim: true, required: true},
    reqMethod: {type: String, trim: true, required: true},
    reqParams: {type: Array},
    reqBody: {type: Array},
    token: {type: String, trim: true, required: true},
  },
  { timestamps: true }
  );


module.exports = mongoose.model('Request', requestSchema);
