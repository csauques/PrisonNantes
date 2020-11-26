var crud = require('./crud');
var express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;
var bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Prison';
let db;

app.use(bodyParser.json());

MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

//Page d'accueil
app.get('/', function (req, res) {
    res.send("Serveur pour la prison de Nantes !");
})

// --------Detenu
//Page pour lire les données de Detenu
app.get('/detenu', function (req, res) {
    crud.readAll(db, 'Detenu', res);
})

//Page pour lire les données d'un Detenu selon son id
app.get('/detenu/:id', function (req, res) {
    const id = req.params.id;
    const id_text = "{ n_ecrou : " + id + " }";
    console.log(id_text);
    crud.read(db, 'Detenu', id_text, res);
})

//Permet de créer un detenu
app.post('/detenu', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'Detenu', newDet);
    res.send("Reussi");
})

//Permet de modifier un detenu selon l'id
app.put('/detenu/:id', async (req,res) => {
    const id = req.params.id;
    const id_text = "{ n_ecrou : " + id + " }";
    const newDet = req.body;
    crud.update(db, 'Detenu', newDet, id_text);
    res.send("Reussi");
})

//Permet de supprimer un detenu selon l'id
app.delete('/Detenu/:id', async (req,res) => {
    const id = req.params.id;
    const id_text = "{ n_ecrou : " + id + " }";
    crud.delete(db, 'Detenu', id_text);
    res.send("Reussi");
})

app.listen(3000, function () {
    console.log('Votre app est disponible sur localhost:3000 !')
})
