var cors = require('cors');
var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
  res.json({ message: 'hooray! your API is working!' });
});

app
  .use(cors())
  .use('/api', apiRouter)
  .listen(port, function() {
    console.log('API Magic happening on port ' + port);
  });
