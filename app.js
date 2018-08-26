var express=require('express');
var http=require('http');
var path=require('path');

var app = express();

app.use(express.json);
app.use(express.static(path.join(__dirname, 'dist/cricket-info'))); 
app.use('/', express.static(path.join(__dirname,'dist/cricket-info')));

// app.get('/*',(req,res) => res.sendFile(path.join(__dirname)));


var server = http.createServer(app);
var serverPort = process.env.port||3000;
server.listen(serverPort, ()=> console.log("Node server listening at: "+ serverPort));
module.exports = app;