var det = require('./crud');

const express = require('express');
const app = express();


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Prison';
let db;


MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
    /*det.readAll(db, 'Detenu', function() {
        det.create(db, 'Detenu', function() {
            det.readAll(db, 'Detenu', function() {
                det.update(db, 'Detenu', function() {
                    det.readAll(db, 'Detenu', function() {
                        det.delete(db, 'Detenu', function() {
                            det.readAll(db, 'Detenu', function() {
                                //client.close();
                            });
                        });
                    });
                });
            });
        });
    });*/
});


app.get('/', function (req, res) {
    res.send("Hello world")
})

app.get('/Detenu', function (req, res) {
    det.readAll(db, 'Detenu', res);
})

app.post('/Detenu', function (req, res) {
    const new = req.body;
    

})

app.listen(3000, function () {
     console.log('Votre app est disponible sur localhost:3000 !')
     console.log('Branche Lucas')
})
