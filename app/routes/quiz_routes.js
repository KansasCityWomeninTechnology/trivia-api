var express = require('express');
var apiRouter = express.Router();

var sampleQuiz = require('./../quiz_fixture.js');

apiRouter.get('/', function(req, res) {
  res.json({ message: 'hooray! your API is working!' });
});

apiRouter.get('/sample', function(req, res) {
  res.json(sampleQuiz);
});

module.exports = apiRouter;
