var express=require('express');
var http=require('http');
var path=require('path');
bodyParser = require('body-parser');


var app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/login',function(req,res){
    console.log('User: '+JSON.stringify(req.body));

    if(req.body.username=="admin" && req.body.password=="admin"){
        res.status(200).send({id:1, name:"admin", role:"Admin", token:"Admin"});
    }
    else{
        res.status(500).send({"msg":"Please enter valid credentials!"});
    }
});

app.get('/test',(req,res)=>res.send('It is there'));

var server = http.createServer(app);
var serverPort = process.env.port||3000;
server.listen(serverPort, ()=> console.log("Node server listening at: "+ serverPort));

