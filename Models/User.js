const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ownDoc:[{
    type: Schema.ObjectId,
    ref: 'Document',
  }],
  sharedDoc: [{
    type: Schema.ObjectId,
    ref: 'Document',
  }]
});

module.exports = User;

//everything that runs through webpack can use imports and exports, but backend need require and module.exports
