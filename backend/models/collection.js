const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionSchema = new Schema(
  {
    name: {type: String, trim: true, required: true},
    workspaceId: {type: String, trim: true, required: true},
    requests: {type: Array},
    responses: {type: Array}
  },
  { timestamps: true }
  );


module.exports = mongoose.model('Collection', collectionSchema);
