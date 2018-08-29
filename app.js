var express=require('express');
var http=require('http');
var bodyParser = require('body-parser');
var router=require('./routes/router');

var app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
  });

  app.use('/',router);


var server = http.createServer(app);
var serverPort = process.env.port||3000;
server.listen(serverPort, ()=> console.log("Node server listening at: "+ serverPort));

