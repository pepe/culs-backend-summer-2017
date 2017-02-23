var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Presentation = mongoose.model('Presentation',
                          {
                              name: String,
                              document: String,
                              user_id: Schema.Types.ObjectId
                          });

module.exports = Presentation;
