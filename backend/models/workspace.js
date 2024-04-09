const mongoose = require('mongoose');
const { Schema } = mongoose;

const workspaceSchema = new Schema(
  {
    name: {type: String, trim: true, required: true},
    ownerId: {type: String, trim: true, required: true},
    collections: {type: Array},
    contributors: {type: Array}
  },
  { timestamps: true }
  );


module.exports = mongoose.model('Workspace', workspaceSchema);
