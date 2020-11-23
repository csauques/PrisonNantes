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
                            det.readAll(db, 'Detenu', function()
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
    det.create(db, 'Detenu', new);
})

app.put('/Detenu/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const new = req.body;
    det.update(db, 'Detenu', new, id);

})

app.delete('/Detenu/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        det.delete(db, 'Detenu', id);
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.listen(3000, function () {
     console.log('Votre app est disponible sur localhost:3000 !')
})
