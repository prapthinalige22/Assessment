var express = require('express');
var router = express.Router();
var fs = require('fs');
const multer = require('multer');
var path=require('path');

router.post('/login',(req,res) => {
    if(req.body.username.toLowerCase()=="admin" && req.body.password.toLowerCase()=="admin"){
        res.status(200).send({id:1, name:"admin", role:"Admin", token:"Admin"});
    }
    else if(req.body.username.toLowerCase()=="user" && req.body.password.toLowerCase()=="user"){
        res.status(200).send({id:2, name:"user", role:"User", token:"User"});
    }
    else{
        res.status(500).send({"msg":"Please enter valid credentials!"});
    }
});

router.post('/getDetailsByCategory', (req,res) => {
    let playerdata = fs.readFileSync('./src/assets/data/player.json');  
    let players = JSON.parse(playerdata);
    res.send(players[req.body.category])

})

const DIR = './src/assets/img';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});


router.post('/addPlayerDetails', (req,res) => {
    if(req.headers['authorization']==`"Admin"`){
        let playerdata = fs.readFileSync('./src/assets/data/player.json');  
        let players = JSON.parse(playerdata);
        var name=  req.body.name;
        var role=  req.body.role;
        var country=  req.body.country;
        players["Country"][country][name]=role;
        players["Role"][role][name]=country;
        var playersJSON = JSON.stringify(players);
        fs.writeFileSync('./src/assets/data/player.json', playersJSON);   
        res.status(200).send({data:"Success"});
    }
    else{
        res.status(404).send("Please login as an Admin for this operation to complete");
    }


});

router.post('/imgUpload',upload.single('pic'), function (req, res) {
    if(req.headers['authorization']==`"Admin"`){
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
    }
    else{
        res.status(404).send("Please login as an Admin for this operation to complete");
    }
});



module.exports = router;