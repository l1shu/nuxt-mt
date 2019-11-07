const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  emial: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('User', UserSchema)