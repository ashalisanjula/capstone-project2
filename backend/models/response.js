const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema(
  {
    status: {type: String, trim: true, required: true},
    collectionId: {type: String, trim: true, required: true},
    requestId: {type: String, trim: true, required: true},
    resBody: {type: Array, trim: true, required: true}
  },
  { timestamps: true }
  );


module.exports = mongoose.model('Response', responseSchema);
