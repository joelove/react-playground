const express = require('express');
const app = express();

const Datastore = require('nedb');
const db = new Datastore();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res){
  db.find({}, function(err, docs){
    res.json(docs);
  });
});

app.post('/', function(req, res){
  db.insert(req.body, function(){
    res.send('success');
  });
});

console.log("Simple comments API listening...");
app.listen(process.env.PORT || 4730);
