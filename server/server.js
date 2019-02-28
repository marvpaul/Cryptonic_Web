var express = require('express'); 
var path = require('path'); 
var bodyParser = require('body-parser'); 
var mongo = require('mongoose'); 

let connectionString = "";
if(process.env.connectionString == null || process.env.connectionString == ""){
    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync("config.json"));
    connectionString = config.connectionString; 
} else{
    connectionString = process.env.connectionString;
}


var db = mongo.connect(connectionString, { useNewUrlParser: true }, function(err, response){
    if(err){console.log(err);}
    else{ console.log("Connected to mongo db") }
});

var app = express(); 
app.use(bodyParser()); 
app.use(bodyParser.json({limit: '5mb'})); 
app.use(bodyParser.urlencoded({extended: true}))


app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials',  true);
    next();  
})


var MessagesSchema = new mongo.Schema({
    message: String, 
    expirationTimestamp: Number
});


var Message = mongo.model('Message', MessagesSchema); 

/**
 * Endpoint for posting new messages into the database.
 */
app.post('/api/saveMes', function(req, res){

    var mod = new Message(req.body); 
    console.log(mod);
    mod.save(function(err, data){
        if(err){
            res.status(404).send(err);  
        } else{
            res.send({data: data.id});
        }
    }); 
})

/**
 * Endpoint for deleting a message given a certrain id.
 */
app.get('/api/deleteMes/:id', function(req, res){
    Message.deleteOne({ _id: req.params.id}, function(err){
        if(err){
            res.status(404).send(err); 
        } else{
            console.log("Deleted message " + req.params.id);
            res.send({data: "Deleted"}); 
        }
    });
})

/**
 * Get endpoint for a message. In case the _id which is send by client exists in database, 
 * the message is loaded from database. In case the message is expired or no message with a certain id exists, 
 * null is returned. Otherwhise the encrypted message object is returned. 
 */
app.get('/api/getMes/:id', function(req, res){
    var id = req.params.id; 
    console.log("Search for: ", id);
    Message.findById(id, function (err, data) { 
        if(err || data === null){
            console.log("Message not found");
            res.send(null); 
        } else{
            Message.deleteOne({_id: id}, function(err) {
                if (!err) {
                    console.log("Deleted message " + id);
                }
                else {
                    console.log(err);
            }});
            let now = new Date().getTime(); 
            if(data.expirationTimestamp != null && data.expirationTimestamp < now){
                res.send(null);
            } else{
                res.send(data); 
            }
        }
    });
})

app.listen(process.env.PORT || 8080, function(){
    if(process.env.port != null){
        console.log("Server listen to " + process.env.port); 
    } else{
        console.log("Server listen to " + 8080); 
    }
})