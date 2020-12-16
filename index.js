const crud = require('./crud');
const express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;
const bodyParser = require('body-parser');
const axios = require('axios');
const Validator = require('jsonschema').Validator;
var v = new Validator();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Prison';
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(url, function(err, client) {
    console.log("Connecté à la base de données de la prison");
    db = client.db(dbName);
});

//Page d'accueil
app.get('/', function (req, res) {
    res.send("Serveur pour la prison de Nantes !");
})

//-----------------------------------CRUD
// --------Detenu
//Page pour lire les données de tous les detenus
app.get('/detenu', function (req, res) {
    crud.readAll(db, 'Detenu', res);
})

//Page pour lire les données d'un detenu selon son id
app.get('/detenu/:id', function (req, res) {
    const id = req.params.id;
    const texte_id = "{ n_ecrou : " + id + " }";
    crud.read(db, 'Detenu', texte_id, res);
})

//Permet de créer un detenu
app.post('/detenu', function (req, res) {
    const newDetenu = req.body;
    var schema = {"n_ecrou": "string", "prenom": "string", "nom": "string", "date_naissance": "string", "lieu_naissance": "string", "required": ["n_ecrou", "nom", "prenom", "date_naissance", "lieu_naissance"]};
    var vali = v.validate(newDetenu, schema);
    if(vali.valid){
        crud.create(db, 'Detenu', newDetenu);
        res.send("Reussi à inserer un detenu");
    }else{
        res.send("Format du detenu mauvais");
    }
})

//Permet de modifier un detenu selon l'id
app.put('/detenu/:id', function (req,res) {
    const id = req.params.id;
    const texte_id = "{ n_ecrou : " + id + " }";
    const newDetenu = req.body;
    crud.update(db, 'Detenu', newDetenu, texte_id);
    res.send("Reussi à modifier un detenu");
})

//Permet de supprimer un detenu selon l'id
app.delete('/detenu/:id', function (req,res) {
    const id = req.params.id;
    const texte_id = "{ n_ecrou : " + id + " }";
    crud.delete(db, 'Detenu', texte_id);
    res.send("Reussi à supprimer un detenu");
})

// --------Affaire
//Page pour lire les données des affaires
app.get('/affaire', function (req, res) {
    crud.readAll(db, 'Affaire', res);
})

//Page pour lire les données d'une affaire selon son id
app.get('/affaire/:id', function (req, res) {
    const id = req.params.id;
    const texte_id = "{ n_affaire : " + id + " }";
    crud.read(db, 'Affaire', texte_id, res);
})

//Permet de créer une affaire
app.post('/affaire', function (req, res) {
    const newAffaire = req.body;
    var schema = {"n_affaire": "string", "nom_juridiction": "string", "date_faits": "string", "required": ["n_affaire", "nom_juridiction", "date_faits"]};
    var vali = v.validate(newAffaire, schema);
    if(vali.valid){
        crud.create(db, 'Affaire', newAffaire);
        res.send("Reussi à créer une affaire");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une affaire selon l'id
app.put('/affaire/:id', function (req,res) {
    const id = req.params.id;
    const texte_id = "{ n_affaire : " + id + " }";
    const newAffaire = req.body;
    crud.update(db, 'Affaire', newAffaire, texte_id);
    res.send("Reussi à modifier une affaire");
})

//Permet de supprimer une affaire selon l'id
app.delete('/affaire/:id', function (req,res) {
    const id = req.params.id;
    const texte_id = "{ n_affaire : " + id + " }";
    crud.delete(db, 'Affaire', texte_id);
    res.send("Reussi à supprimer une affaire");
})

// --------Motif
//Page pour lire les données des motifs
app.get('/motif', function (req, res) {
    crud.readAll(db, 'Motif', res);
})

//Page pour lire les données d'un motif selon son id
app.get('/motif/:id', function (req, res) {
    const id = req.params.id;
    const texte_id = "{ n_motif : " + id + " }";
    crud.read(db, 'Motif', texte_id, res);
})

//Permet de créer un motif
app.post('/motif', function (req, res) {
    const newMotif = req.body;
    var schema = {"n_motif": "string", "libelle_motif": "string", "required": ["n_motif", "libelle_motif"]};
    var vali = v.validate(newMotif, schema);
    if(vali.valid){
        crud.create(db, 'Motif', newMotif);
        res.send("Reussi à créer un motif");
    }else{
        res.send("Faux");
    }

})

//Permet de modifier un motif selon l'id
app.put('/motif/:id', function (req,res) {
    const id = req.params.id;
    const texte_id = "{ n_motif : " + id + " }";
    const newMotif = req.body;
    crud.update(db, 'Motif', newMotif, texte_id);
    res.send("Reussi à modifier un motif");
})

//Permet de supprimer un motif selon l'id
app.delete('/motif/:id', function (req,res) {
    const id = req.params.id;
    const texte_id = "{ n_motif : " + id + " }";
    crud.delete(db, 'Motif', texte_id);
    res.send("Reussi à supprimer un motif");
})

// --------Incarceration
//Page pour lire les données des incarcérations
app.get('/incarceration', function (req, res) {
    crud.readAll(db, 'Incarceration', res);
})

//Permet de créer une incarceration
app.post('/incarceration', function (req, res) {
    const newInc = req.body;
    var schema = {"n_ecrou": "string", "n_affaire": "string", "nom_juridiction": "string", "date_incarceration": "string", "n_motif" : "string", "required": ["n_ecrou", "n_affaire", "nom_juridiction", "date_incarceration", "n_motif"]};
    var vali = v.validate(newInc, schema);
    if(vali.valid){
        crud.create(db, 'Incarceration', newInc);
        res.send("Reussi à créer une incarceration");
    }else{
        res.send("Faux");
    }
})

// --------Decision
//Page pour lire les données des decisions
app.get('/decision', function (req, res) {
    crud.readAll(db, 'Decision', res);
})

//Permet de créer une decision
app.post('/decision', function (req, res) {
    const newDecision = req.body;
    crud.create(db, 'Decision', newDecision);
    res.send("Reussi à créer un decision");
})


// --------Liberation Definitive
//Page pour lire les données des liberations definitive
app.get('/liberationDefinitive', function (req, res) {
    crud.readAll(db, 'LiberationDefinitive', res);
})

//Permet de créer une liberation definitive
app.post('/liberationDefinitive', function (req, res) {
    const newLB = req.body;
    var schema = {"n_type_decision": "string", "n_ecrou": "string", "date_decision": "string", "date_liberation": "string", "required": ["n_type_decision", "n_ecrou", "date_decision", "date_liberation"]};
    var vali = v.validate(newLB, schema);
    if(vali.valid){
        crud.create(db, 'LiberationDefinitive', newLB);
        res.send("Reussi à créer une libération définitive");
    }else{
        res.send("Faux");
    }
})

// --------Condamnation
//Page pour lire les données des condamnations
app.get('/condamnation', function (req, res) {
    crud.readAll(db, 'Condamnation', res);
})

//Permet de créer une condamnation
app.post('/condamnation', function (req, res) {
    const newCond = req.body;
    var schema = {"n_type_decision": "string", "n_ecrou": "string", "date_decision": "string", "duree": "string", "required": ["n_type_decision", "n_ecrou", "date_decision", "duree"]};
    var vali = v.validate(newCond, schema);
    if(vali.valid){
        crud.create(db, 'Condamnation', newCond);
        res.send("Reussi à créer une condamnation");
    }else{
        res.send("Faux");
    }
})

// --------Reduction Peine
//Page pour lire les données des reductions de peine
app.get('/reductionPeine', function (req, res) {
    crud.readAll(db, 'ReductionPeine', res);
})

//Permet de créer une reduction de peine
app.post('/reductionPeine', function (req, res) {
    const newRP = req.body;
    var schema = {"n_type_decision": "string", "n_ecrou": "string", "date_decision": "string", "duree": "string", "required": ["n_type_decision", "n_ecrou", "date_decision", "duree"]};
    var vali = v.validate(newRP, schema);
    if(vali.valid){
        crud.create(db, 'ReductionPeine', newRP);
        res.send("Reussi à créer une réduction de peine");
    }else{
        res.send("Faux");
    }
})

// --------Detenu Affaire
//Page pour lire les données des detenus et affaires
app.get('/detenuAffaire', function (req, res) {
    crud.readAll(db, 'DetenuAffaire', res);
})

//Permet de créer un detenu et affaire
app.post('/detenuAffaire', function (req, res) {
    const newDA = req.body;
    var schema = {"n_ecrou": "string", "n_affaire": "string", "nom_juridiction": "string", "required": ["n_ecrou", "n_affaire", "nom_juridiction"]};
    var vali = v.validate(newDA, schema);
    if(vali.valid){
        crud.create(db, 'DetenuAffaire', newDA);
        res.send("Reussi à créer un detenu et affaire");
    }else{
        res.send("Faux");
    }
})


//----------------------------------- Fin CRUD

// --------INCARCERER
//Ouvre page pour faire un nouveau detenu
app.get('/incarcerer', function (req, res) {
    res.sendFile( __dirname  + '/views/nouveauDetenu.html');
})

//créer un nouveau detenu puis redirect sur la suite
app.post('/incarcerer', function (req, res) {
    const newDetenu = req.body;
    axios.post('http://localhost:3000/detenu', newDetenu)
    .then(function (response) {
        res.redirect('/incarcerer/' + newDetenu.n_ecrou + "/affaire");
    })
})

//ouvre la page pour choisir affaire
app.get('/incarcerer/:idDet/affaire', function (req, res) {
    axios.get('http://localhost:3000/affaire')
    .then(response => {
        const affaires = response.data;
        res.render("choixAffaire.ejs", {affaires: affaires});
    })
})

//si choix est nouveau affaire et va vers une page pour créer nouvel affaire
//sinon va vers la suite
app.post('/incarcerer/:idDet/affaire', function (req, res) {
    const affaire = req.body;
    const idDet = req.params.idDet;
    if (affaire.n_affaire == "-1") {
        res.sendFile( __dirname  + '/views/nouvelleAffaire.html');
    }else{
        res.redirect('/incarcerer/' + idDet + "/affaire/" + affaire.n_affaire + "/motif");
    }
})

//crée la nouvelle affaire
app.post('/incarcerer/:idDet/newAffaire', function (req, res) {
    const newAffaire = req.body;
    const idDet = req.params.idDet;
    axios.post('http://localhost:3000/affaire', newAffaire)
    .then(function (response) {
        res.redirect('/incarcerer/' + idDet + "/affaire/" + newAffaire.n_affaire + "/motif");
    })
})

//ouvre la page pour chosir le motif
app.get('/incarcerer/:idDet/affaire/:idAff/motif', function (req, res) {
    axios.get('http://localhost:3000/motif')
    .then(response => {
        const motifs = response.data;
        res.render("choixMotif.ejs", {motifs: motifs});
    })
})

//si choix est nouveau motif et va vers une page pour créer nouveau motif
//sinon créer l'incarceration
app.post('/incarcerer/:idDet/affaire/:idAff/motif', function (req, res) {
    const motif = req.body;
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    if (motif.n_motif == "-1") {
        res.sendFile( __dirname  + '/views/nouveauMotif.html');
    }else{
        const now = new Date();
        const texte_now = (('0'+now.getDate()   ).slice(-2)) + "/" + (('0'+now.getMonth()+1).slice(-2)) + "/" + now.getFullYear();
        let incarcerer = {n_ecrou : idDet, n_affaire : idAff, nom_juridiction : "Nantes", date_incarceration : texte_now, motif : motif.n_motif };
        axios.post('http://localhost:3000/incarceration', incarcerer)
        .then(function (response) {
            res.redirect('/incarceration');
        })
    }
})

//créer un nouveau motif puis après l'incarcerartion
app.post('/incarcerer/:idDet/affaire/:idAff/newMotif', function (req, res) {
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    const newMotif = req.body;
    axios.post('http://localhost:3000/motif', newMotif)
    .then(function (response) {
        const now = new Date();
        const texte_now = (('0'+now.getDate()   ).slice(-2)) + "/" + (('0'+now.getMonth()+1).slice(-2)) + "/" + now.getFullYear();
        let incarcerer = {n_ecrou : idDet, n_affaire : idAff, nom_juridiction : "Nantes", date_incarceration : texte_now, motif : newMotif.n_motif };
        axios.post('http://localhost:3000/incarceration', incarcerer)
        .then(function (response) {
            res.redirect('/incarceration');
        })
    })
})

//-------------------decider condamnation, réduction peine ou libération définitive
//appelle la page pour créer une liberation definitive
app.get('/deciderLiberationDefinitive', function (req, res) {
    axios.get('http://localhost:3000/detenu')
    .then(response => {
        const detenus = response.data;
        res.render("liberationDefinitive.ejs", {detenus: detenus});
    })
})

//créer une decision puis une liberation definitive
app.post('/deciderLiberationDefinitive', function (req, res) {
    const newL = req.body;
    const decision = {n_type_decision : "3", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision};
    const libDef = {n_type_decision : "3", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision, date_liberation : newL.date_liberation};
    axios.post('http://localhost:3000/decision', decision)
    .then(function (response) {
        axios.post('http://localhost:3000/liberationDefinitive', libDef)
        .then(function (response) {
            res.redirect('/liberationDefinitive');
        })
    })
})


//appelle la page pour créer une condamnation
app.get('/deciderCondamnation', function (req, res) {
    axios.get('http://localhost:3000/detenu')
    .then(response => {
        const detenus = response.data;
        res.render("condamnation.ejs", {detenus: detenus});
    })
})

//créer une decision puis une condamnation
app.post('/deciderCondamnation', function (req, res) {
    const newC = req.body;
    const decision = {n_type_decision : "1", n_ecrou : newC.n_ecrou, date_decision : newC.date_decision};
    const cond = {n_type_decision : "1", n_ecrou : newC.n_ecrou, date_decision : newC.date_decision, duree : newC.duree};
    axios.post('http://localhost:3000/decision', decision)
    .then(function (response) {
        axios.post('http://localhost:3000/condamnation', cond)
        .then(function (response) {
            res.redirect('/condamnation');
        })
    })
})

//appelle la page pour créer une condamnation
app.get('/deciderReductionPeine', function (req, res) {
    axios.get('http://localhost:3000/detenu')
    .then(response => {
        const detenus = response.data;
        res.render("reductionPeine.ejs", {detenus: detenus});
    })
})

//créer une decision puis une condamnation
app.post('/deciderReductionPeine', function (req, res) {
    const newR = req.body;
    const decision = {n_type_decision : "2", n_ecrou : newR.n_ecrou, date_decision : newR.date_decision};
    const redPei = {n_type_decision : "2", n_ecrou : newR.n_ecrou, date_decision : newR.date_decision, duree : newR.duree};
    axios.post('http://localhost:3000/decision', decision)
    .then(function (response) {
        axios.post('http://localhost:3000/reductionPeine', redPei)
        .then(function (response) {
            res.redirect('/reductionPeine');
        })
    })
})


//-------------------detenu en préventive
app.get('/preventive', function (req, res) {
    db.collection('Detenu').aggregate([
    { $lookup:
       {
         from: 'DetenuAffaire',
         localField: 'n_ecrou',
         foreignField: 'n_ecrou',
         as: 'affaire'
       }
     }
    ]).toArray(function(err, result){
        let detenuPreventive = [];
        if (err) throw err;
        result.forEach((det) => {
            if (det.affaire.length == 0) {
                detenuPreventive.push(det);
            }
        });
        res.render("preventive.ejs", {detenuPreventive: detenuPreventive});
    });
})

app.listen(3000, function () {
    console.log('Votre app est disponible sur localhost:3000 !');
})
