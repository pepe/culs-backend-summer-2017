var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var User = require('../models/user');
var Presentation = require('../models/presentation');

router.post('/', function(req, res, next) {
  var token = req.headers.token;
  var body = req.body;

  var user = User.findOne({_id: ObjectID(token)}, function(err, user) {
    if (err) {
      res.status(500);
      res.send();
    } else {
      if (user != null) {
        var presentation = new Presentation({name: body.name, document: body.document, user_id: ObjectID(token)});
        presentation.save(function(err, presentation) {
          if (err) {
            res.status(422);
            res.send();
          } else {
            res.status(201);
            res.location("/presentations/" + presentation.id);
            res.send();
          }
        })
      } else {
        res.status(401);
        res.send();
      }
    }
  });
});

router.get('/', function(req, res, next) {
  var token = req.headers.token;
  var body = req.body;

  var user = User.findOne({_id: ObjectID(token)}, function(err, user) {
    if (err) {
      res.status(500);
      res.send();
    } else {
      if (user != null) {
        Presentation.find({user_id: ObjectID(token)}, function(err, presentations) {
          if(err) {
            res.status(500);
            res.send();
          } else {
            console.log(presentations);
            res.status(200);
            res.send(presentations);
          }
        });
      } else {
        res.status(401);
        res.send();
      }
    }
  });
});

module.exports = router;
