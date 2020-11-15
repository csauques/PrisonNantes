var det = require('./detenu');

const express = require('express');
const app = express();


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Prison';
let db;


MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
    det.readAllDetenu(db, function() {
        det.createDetenu(db, function() {
            det.readAllDetenu(db, function() {
                det.updateDetenu(db, function() {
                    det.readAllDetenu(db, function() {
                        det.deleteDetenu(db, function() {
                            det.readAllDetenu(db, function() {
                                client.close();
                            });
                        });
                    });
                });
            });
        });
    });
});


app.get('/', function (req, res) {
     res.send('Hello World!');
})

app.listen(3000, function () {
     console.log('Votre app est disponible sur localhost:3000 !')
})
