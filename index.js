const express = require('express');
const app = express();


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Prison';
let db

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Detenu');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);

findDocuments(db, function() {
    client.close();
  });
});



app.get('/', function (req, res) {
 res.send('Hello World!');
})



app.listen(3000, function () {
 console.log('Votre app est disponible sur localhost:3000 !')
})
