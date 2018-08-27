var express=require('express');
var http=require('http');
var path=require('path');
var bodyParser = require('body-parser');
var fs = require('fs');


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

app.post('/login',(req,res) => {
    console.log('User: '+JSON.stringify(req.body));

    if(req.body.username=="admin" && req.body.password=="admin"){
        res.status(200).send({id:1, name:"admin", role:"Admin", token:"Admin"});
    }
    else{
        res.status(500).send({"msg":"Please enter valid credentials!"});
    }
});

app.post('/getDetailsByCategory', (req,res) => {
    let playerdata = fs.readFileSync('./src/assets/data/player.json');  
    let players = JSON.parse(playerdata);  
    console.log(players); 
    res.send(players[req.body.category])

})


app.post('/addPlayerDetails', (req,res) => {
    let playerdata = fs.readFileSync('./src/assets/data/player.json');  
    let players = JSON.parse(playerdata);
    console.log(players["Country"][req.body.country]); 

    var name=  req.body.name;
    var role=  req.body.role;
    var country=  req.body.country;
    players["Country"][country][name]=role;
    players["Role"][role][name]=country;

//     var temp=    JSON.stringify(players["Country"][country]);
// temp.push({name: role});
//     players["Role"][role].push({name: country});
console.log(players["Country"][req.body.country]);
    var playersJSON = JSON.stringify(players);
    fs.writeFileSync('./src/assets/data/player.json', playersJSON);   
    res.status(200).send({data:"Success"});

});

var server = http.createServer(app);
var serverPort = process.env.port||3000;
server.listen(serverPort, ()=> console.log("Node server listening at: "+ serverPort));

