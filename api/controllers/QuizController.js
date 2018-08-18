/**
 * QuizController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var quiz = require('./quiz');
var sampleQuiz = require('./quiz_fixture');
module.exports = {
  
    cheer: function(req, res) {
        res.json({ message: 'hooray! your API is working!'});
      },
      
      sample: function(req, res) {
        res.json(sampleQuiz);
      },
      
      category: function(req, res) {
        quiz
          .getQuiz(req.params)
          .then(function(result){res.json(result);});
      },
      
      difficulty: function(req, res) {
        quiz
          .getQuiz(req.params)
          .then(function(result){res.json(result);});
      },
      
      count: function(req, res) {
        quiz
          .getQuiz(req.params)
          .then(function(result){res.json(result);});
      }
};

