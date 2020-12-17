//const crud = require('./crud');
const express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;
const bodyParser = require('body-parser');
const axios = require('axios');

const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors:true, removeAdditional:'all' });

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
    db.collection('Detenu').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'un detenu selon son id
app.get('/detenu/:id', function (req, res) {
    const id = req.params.id;
    db.collection('Detenu').findOne({n_ecrou : id}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer un detenu
app.post('/detenu', function (req, res) {
    const newDetenu = req.body;
    var schema = {"properties" : {
        "n_ecrou": {"type": "string"},
        "prenom": {"type": "string"},
        "nom": {"type": "string"},
        "date_naissance": {"type": "string"},
        "lieu_naissance": {"type": "string"}
        },
        "required": ["n_ecrou", "nom", "prenom", "date_naissance", "lieu_naissance"]};
    const valid = ajv.validate(schema, newDetenu);
    if(valid){
        db.collection('Detenu').insertOne(newDetenu);
        res.send("Reussi à inserer un detenu");
    }else{
        res.send("Format du detenu mauvais");
    }
})

//Permet de modifier un detenu selon l'id
app.put('/detenu/:id', function (req,res) {
    const id = req.params.id;
    const newDetenu = req.body;
    var schema = {"properties" : {
        "n_ecrou": {"type": "string"},
        "prenom": {"type": "string"},
        "nom": {"type": "string"},
        "date_naissance": {"type": "string"},
        "lieu_naissance": {"type": "string"}
    }};
    const valid = ajv.validate(schema, newDetenu);
    if(valid){
        db.collection('Detenu').updateOne({n_ecrou : id}, {$set: newDetenu});
        res.send("Reussi à modifier un detenu");
    }else{
        res.send("Format du detenu mauvais");
    }

})

//Permet de supprimer un detenu selon l'id
app.delete('/detenu/:id', function (req,res) {
    const id = req.params.id;
    db.collection('Detenu').deleteOne({n_ecrou : id});
    res.send("Reussi à supprimer un detenu");
})

// --------Affaire
//Page pour lire les données des affaires
app.get('/affaire', function (req, res) {
    db.collection('Affaire').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'une affaire selon son id
app.get('/affaire/:id', function (req, res) {
    const id = req.params.id;
    db.collection('Affaire').findOne({n_affaire : id}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer une affaire
app.post('/affaire', function (req, res) {
    const newAffaire = req.body;
    var schema = {"properties" : {
        "n_affaire": {"type": "string"},
        "nom_juridiction": {"type": "string"},
        "date_faits": {"type": "string"}
        },
        "required": ["n_affaire", "nom_juridiction", "date_faits"]};
    const valid = ajv.validate(schema, newAffaire);
    if(valid){
        db.collection('Affaire').insertOne(newAffaire);
        res.send("Reussi à créer une affaire");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une affaire selon l'id
app.put('/affaire/:id', function (req,res) {
    const id = req.params.id;
    const newAffaire = req.body;
    var schema = {"properties" : {
        "n_affaire": {"type": "string"},
        "nom_juridiction": {"type": "string"},
        "date_faits": {"type": "string"}
    }};
    const valid = ajv.validate(schema, newAffaire);
    if(valid){
        db.collection('Affaire').updateOne({n_affaire : id}, {$set: newAffaire});
        res.send("Reussi à modifier une affaire");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer une affaire selon l'id
app.delete('/affaire/:id', function (req,res) {
    const id = req.params.id;
    db.collection('Affaire').deleteOne({n_affaire : id});
    res.send("Reussi à supprimer une affaire");
})

// --------Motif
//Page pour lire les données des motifs
app.get('/motif', function (req, res) {
    db.collection('Motif').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'un motif selon son id
app.get('/motif/:id', function (req, res) {
    const id = req.params.id;
    db.collection('Motif').findOne({n_motif : id}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer un motif
app.post('/motif', function (req, res) {
    const newMotif = req.body;
    var schema = {"properties" : {
        "n_motif": {"type": "string"},
        "libelle_motif": {"type": "string"}
        },
        "required": ["n_motif", "libelle_motif"]};
    const valid = ajv.validate(schema, newMotif);
    if(valid){
        db.collection('Motif').insertOne(newMotif);
        res.send("Reussi à créer un motif");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier un motif selon l'id
app.put('/motif/:id', function (req,res) {
    const id = req.params.id;
    const newMotif = req.body;
    var schema = {"properties" : {
        "n_motif": {"type": "string"},
        "libelle_motif": {"type": "string"}
    }};
    const valid = ajv.validate(schema, newMotif);
    if(valid){
        db.collection('Motif').updateOne({n_motif : id}, {$set: newMotif});
        res.send("Reussi à modifier un motif");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer un motif selon l'id
app.delete('/motif/:id', function (req,res) {
    const id = req.params.id;
    db.collection('Motif').deleteOne({n_motif : id});
    res.send("Reussi à supprimer un motif");
})

// --------Incarceration
//Page pour lire les données des incarcérations
app.get('/incarceration', function (req, res) {
    db.collection('Incarceration').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'une incarceration selon detenu et affaire
app.get('/incarceration/:idDet/:idAff', function (req, res) {
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    db.collection('Incarceration').findOne({n_ecrou : idDet, n_affaire : idAff}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer une incarceration
app.post('/incarceration', function (req, res) {
    const newInc = req.body;
    var schema = {"properties" : {
        "n_ecrou": {"type": "string"},
        "n_affaire": {"type": "string"},
        "nom_juridiction": {"type": "string"},
        "date_incarceration": {"type": "string"},
        "n_motif": {"type": "string"}
        },
        "required": ["n_ecrou", "n_affaire", "nom_juridiction", "date_incarceration", "n_motif"]};
    const valid = ajv.validate(schema, newInc);
    if(valid){
        db.collection('Incarceration').insertOne(newInc);
        res.send("Reussi à créer une incarceration");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une incarceration selon l'id de detenu et affaire
app.put('/incarceration/:idDet/:idAff', function (req,res) {
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    const newInc = req.body;
    var schema = {"properties" : {
        "n_ecrou": {"type": "string"},
        "n_affaire": {"type": "string"},
        "nom_juridiction": {"type": "string"},
        "date_incarceration": {"type": "string"},
        "n_motif": {"type": "string"}
    };
    const valid = ajv.validate(schema, newInc);
    if(valid){
        db.collection('Incarceration').updateOne({n_ecrou : idDet, n_affaire : idAff}, {$set: newInc});
        res.send("Reussi à modifier une incarceration");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer une incarceration selon l'id
app.delete('/incarceration/:idDet/:idAff', function (req,res) {
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    db.collection('Incarceration').deleteOne({n_ecrou : idDet, n_affaire : idAff});
    res.send("Reussi à supprimer une incarceration");
})

// --------Decision
//Page pour lire les données des decisions
app.get('/decision', function (req, res) {
    db.collection('Decision').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'une incarceration selon detenu et date
app.get('/decision/:idDet/:jdate/:mdate/:adate', function (req, res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('Decision').findOne({n_ecrou : idDet, date_decision : date}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer une decision
app.post('/decision', function (req, res) {
    const newDecision = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"}
        },
        "required": ["n_type_decision", "n_ecrou", "date_decision"]};
    const valid = ajv.validate(schema, newDecision);
    if(valid){
        db.collection('Decision').insertOne(newDecision);
        res.send("Reussi à créer un decision");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une decision selon l'id de detenu et affaire
app.put('/decision/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    const newDecision = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"}
    };
    const valid = ajv.validate(schema, newDecision);
    if(valid){
        db.collection('Decision').updateOne({n_ecrou : idDet, date_decision : date}, {$set: newDecision});
        res.send("Reussi à modifier une incarceration");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer une decision selon l'id
app.delete('/decision/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('Decision').deleteOne({n_ecrou : idDet, date_decision : date});
    res.send("Reussi à supprimer une incarceration");
})


// --------Liberation Definitive
//Page pour lire les données des liberations definitive
app.get('/liberationDefinitive', function (req, res) {
    db.collection('LiberationDefinitive').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'une liberation definitive selon detenu et date
app.get('/liberationDefinitive/:idDet/:jdate/:mdate/:adate', function (req, res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('LiberationDefinitive').findOne({n_ecrou : idDet, date_decision : date}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer une liberation definitive
app.post('/liberationDefinitive', function (req, res) {
    const newLB = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"},
        "date_liberation": {"type": "string"}
        },
        "required": ["n_type_decision", "n_ecrou", "date_decision", "date_liberation"]};
    const valid = ajv.validate(schema, newLB);
    if(valid){
        db.collection('LiberationDefinitive').insertOne(newLB);
        res.send("Reussi à créer une libération définitive");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une liberation definitive selon l'id de detenu et affaire
app.put('/liberationDefinitive/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    const newLB = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"},
        "date_liberation": {"type": "string"}
    };
    const valid = ajv.validate(schema, newLB);
    if(valid){
        db.collection('LiberationDefinitive').updateOne({n_ecrou : idDet, date_decision : date}, {$set: newLB});
        res.send("Reussi à modifier une liberation definitive");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer une liberation definitive selon l'id
app.delete('/liberationDefinitive/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('LiberationDefinitive').deleteOne({n_ecrou : idDet, date_decision : date});
    res.send("Reussi à supprimer une liberation definitive");
})

// --------Condamnation
//Page pour lire les données des condamnations
app.get('/condamnation', function (req, res) {
    db.collection('Condamnation').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'une condamntion selon detenu et date
app.get('/condamnation/:idDet/:jdate/:mdate/:adate', function (req, res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('Condamnation').findOne({n_ecrou : idDet, date_decision : date}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer une condamnation
app.post('/condamnation', function (req, res) {
    const newCond = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"},
        "duree": {"type": "string"}
        },
        "required": ["n_type_decision", "n_ecrou", "date_decision", "duree"]};
    const valid = ajv.validate(schema, newCond);
    if(valid){
        db.collection('Condamnation').insertOne(newCond);
        res.send("Reussi à créer une condamnation");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une condamnation selon l'id de detenu et affaire
app.put('/condamnation/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    const newCond = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"},
        "duree": {"type": "string"}
    };
    const valid = ajv.validate(schema, newCond);
    if(valid){
        db.collection('Condamnation').updateOne({n_ecrou : idDet, date_decision : date}, {$set: newCond});
        res.send("Reussi à modifier une condamnation");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer une condamnation selon l'id
app.delete('/condamnation/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('Condamnation').deleteOne({n_ecrou : idDet, date_decision : date});
    res.send("Reussi à supprimer une condamnation");
})

// --------Reduction Peine
//Page pour lire les données des reductions de peine
app.get('/reductionPeine', function (req, res) {
    db.collection('ReductionPeine').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'une reductions de peine selon detenu et date
app.get('/reductionPeine/:idDet/:jdate/:mdate/:adate', function (req, res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('ReductionPeine').findOne({n_ecrou : idDet, date_decision : date}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer une reduction de peine
app.post('/reductionPeine', function (req, res) {
    const newRP = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"},
        "duree": {"type": "string"}
        },
        "required": ["n_type_decision", "n_ecrou", "date_decision", "duree"]};
    const valid = ajv.validate(schema, newDetenu);
    if(valid){
        db.collection('ReductionPeine').insertOne(newRP);
        res.send("Reussi à créer une réduction de peine");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une reductionPeine selon l'id de detenu et affaire
app.put('/reductionPeine/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    const newRP = req.body;
    var schema = {"properties" : {
        "n_type_decision": {"type": "string"},
        "n_ecrou": {"type": "string"},
        "date_decision": {"type": "string"},
        "duree": {"type": "string"}
    };
    const valid = ajv.validate(schema, newRP);
    if(valid){
        db.collection('ReductionPeine').updateOne({n_ecrou : idDet, date_decision : date}, {$set: newRP});
        res.send("Reussi à modifier une reductionPeine");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer une reductionPeine selon l'id
app.delete('/reductionPeine/:idDet/:jdate/:mdate/:adate', function (req,res) {
    const idDet = req.params.idDet;
    const date = req.params.jdate + "/" + req.params.mdate  "/" + req.params.adate ;
    db.collection('ReductionPeine').deleteOne({n_ecrou : idDet, date_decision : date});
    res.send("Reussi à supprimer une reductionPeine");
})

// --------Detenu Affaire
//Page pour lire les données des detenus et affaires
app.get('/detenuAffaire', function (req, res) {
    db.collection('DetenuAffaire').find({}).toArray(function(err, result) {
        res.send(result);
    });
})

//Page pour lire les données d'une detenuAffaire selon detenu et date
app.get('/detenuAffaire/:idDet/:idAff', function (req, res) {
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    db.collection('DetenuAffaire').findOne({n_ecrou : idDet, n_affaire : idAff}, function(err, result) {
        res.send(result);
    });
})

//Permet de créer un detenu et affaire
app.post('/detenuAffaire', function (req, res) {
    const newDA = req.body;
    var schema = {"properties" : {
        "n_ecrou": {"type": "string"},
        "n_affaire": {"type": "string"},
        "nom_juridiction": {"type": "string"}
        },
        "required": ["n_ecrou", "n_affaire", "nom_juridiction"]};
    const valid = ajv.validate(schema, newDA);
    if(valid){
        db.collection('DetenuAffaire').insertOne(newDA);
        res.send("Reussi à créer un detenu et affaire");
    }else{
        res.send("Faux");
    }
})

//Permet de modifier une incarceration selon l'id de detenu et affaire
app.put('/detenuAffaire/:idDet/:idAff', function (req,res) {
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    const newDA = req.body;
    var schema = {"properties" : {
        "n_ecrou": {"type": "string"},
        "n_affaire": {"type": "string"},
        "nom_juridiction": {"type": "string"}
    };
    const valid = ajv.validate(schema, newDA);
    if(valid){
        db.collection('DetenuAffaire').updateOne({n_ecrou : idDet, n_affaire : idAff}, {$set: newDA});
        res.send("Reussi à modifier une DetenuAffaire");
    }else{
        res.send("Faux");
    }
})

//Permet de supprimer une affaire selon l'id
app.delete('/detenuAffaire/:idDet/:idAff', function (req,res) {
    const idDet = req.params.idDet;
    const idAff = req.params.idAff;
    db.collection('DetenuAffaire').deleteOne({n_ecrou : idDet, n_affaire : idAff});
    res.send("Reussi à supprimer une DetenuAffaire");
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
