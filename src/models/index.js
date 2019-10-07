const mongoose = require('mongoose');

const userSchema = require('./user');

module.exports = {
  User: mongoose.model('User', userSchema),
};
