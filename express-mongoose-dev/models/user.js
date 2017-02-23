var mongoose = require('mongoose');

var User = mongoose.model('User',
                          {
                              login: String,
                              password: String,
                              name: String,
                              email: String
                          });

module.exports = User;
