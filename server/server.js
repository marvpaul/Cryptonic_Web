var express = require('express'); 
var path = require('path'); 
var bodyParser = require('body-parser'); 
var mongo = require('mongoose'); 

let connectionString = "";
let frontendIp = "";
if(process.env.connectionString == null || process.env.connectionString == ""){
    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync("config.json"));
    connectionString = config.connectionString; 
    frontendIp = config.frontendIp; 
} else{
    connectionString = process.env.connectionString;
    frontendIp = process.env.frontendIp;
}


var db = mongo.connect(config.connectionString, function(err, response){
    if(err){console.log(err);}
    else{ console.log("Connected to mongo db") }
});

var app = express(); 
app.use(bodyParser()); 
app.use(bodyParser.json({limit: '5mb'})); 
app.use(bodyParser.urlencoded({extended: true}))


app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin: *'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials',  true);
    next();  
})


var MessagesSchema = new mongo.Schema({
    message: String
});


var Message = mongo.model('Message', MessagesSchema); 

app.post('/api/saveMes', function(req, res){

    var mod = new Message(req.body); 
    console.log(mod);
    mod.save(function(err, data){
        console.log(err);
        if(err){
            res.status(404).send(err);  
        } else{
            res.send({data: data.id});
        }
    }); 
})

app.get('/api/deleteMes/:id', function(req, res){
    Message.remove({ _id: req.params.id}, function(err){
        if(err){
            res.status(404).send(err); 
        } else{
            res.send({data: "Deleted"}); 
        }
    });
})

app.get('/api/getMes/:id', function(req, res){
    var id = req.params.id; 
    console.log("Search for: ", id);
    Message.findById(id, function (err, data) { 
        if(err){
            res.status(404).send(err); 
        } else{
            res.send(data); 
        }
    });
})

app.listen(8080, function(){
    console.log("Server listen ..."); 
})