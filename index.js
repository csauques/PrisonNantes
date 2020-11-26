var crud = require('./crud');

var express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;

var bodyParser = require('body-parser')

app.use(bodyParser.json());


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
    res.send("Serveur pour la prison de Nantes !");
})

app.get('/detenu', function (req, res) {
    crud.readAll(db, 'Detenu', res);
})

app.post('/detenu', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'Detenu', newDet);
    res.send("Reussi");
})

app.put('/detenu/:id', async (req,res) => {
    const id = req.params.id;
    const newDet = req.body;
    crud.update(db, 'Detenu', newDet, id);
    res.send("Reussi");
})

app.delete('/Detenu/:id', async (req,res) => {
        const id = req.params.id;
        crud.delete(db, 'Detenu', id);
        res.send("Reussi");

})

app.listen(3000, function () {
     console.log('Votre app est disponible sur localhost:3000 !')
})
