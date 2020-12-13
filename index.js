var crud = require('./crud');
var express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Prison';
let db;

app.use(bodyParser.urlencoded({ extended: true }));
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

// --------Affaire
//Page pour lire les données de Affaire
app.get('/affaire', function (req, res) {
    crud.readAll(db, 'Affaire', res);
})

//Permet de créer une affaire
app.post('/affaire', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'Affaire', newDet);
    res.send("Reussi");
})

// --------Motif
//Page pour lire les données de Motif
app.get('/motif', function (req, res) {
    crud.readAll(db, 'Motif', res);
})

//Permet de créer un motif
app.post('/motif', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'Motif', newDet);
    res.send("Reussi");
})

// --------Incarceration
//Page pour lire les données de Motif
app.get('/incarceration', function (req, res) {
    crud.readAll(db, 'Incarceration', res);
})

//Permet de créer un motif
app.post('/incarceration', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'Incarceration', newDet);
    res.send("Reussi");
})

// --------Decision
//Page pour lire les données de decision
app.get('/decision', function (req, res) {
    crud.readAll(db, 'Decision', res);
})

//Permet de créer une decision
app.post('/decision', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'Decision', newDet);
    res.send("Reussi");
})


// --------Liberation Definitive
//Page pour lire les données de liberation definitive
app.get('/liberationDefinitive', function (req, res) {
    crud.readAll(db, 'LiberationDefinitive', res);
})

//Permet de créer une liberation definitive
app.post('/liberationDefinitive', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'LiberationDefinitive', newDet);
    res.send("Reussi");
})

// --------Condamnation
//Page pour lire les données de condamnation
app.get('/condamnation', function (req, res) {
    crud.readAll(db, 'Condamnation', res);
})

//Permet de créer une condamnation
app.post('/condamnation', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'Condamnation', newDet);
    res.send("Reussi");
})

// --------Reduction Peine
//Page pour lire les données de reduction peine
app.get('/reductionPeine', function (req, res) {
    crud.readAll(db, 'ReductionPeine', res);
})

//Permet de créer une reduction peine
app.post('/reductionPeine', function (req, res) {
    const newDet = req.body;
    crud.create(db, 'ReductionPeine', newDet);
    res.send("Reussi");
})

const axios = require('axios');
// --------INCARCERER
//Ouvre page pour faire un nouveau detenu
app.get('/incarcerer', function (req, res) {
    res.sendFile( __dirname  + '/views/nouveauDetenu.html');
})

//créer un nouveau detenu puis redirect sur la suite
app.post('/incarcerer', function (req, res) {
    const newDet = req.body;
    console.log(newDet);
    axios.post('http://localhost:3000/detenu', newDet)
    .then(function (response) {
        res.redirect('/incarcerer/' + newDet.n_ecrou + "/affaire");
    })
    .catch(function (error) {
        console.log(error);
    });

})

//ouvre la page pour choisir affaire
app.get('/incarcerer/:idDet/affaire', function (req, res) {
  const idDet = req.params.idDet;
  console.log(idDet);
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
    const newAff = req.body;
    const idDet = req.params.idDet;
    axios.post('http://localhost:3000/affaire', newAff)
    .then(function (response) {
        res.redirect('/incarcerer/' + idDet + "/affaire/" + newAff.n_affaire + "/motif");
    })
    .catch(function (error) {
        console.log(error);
    });
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
      let incarcerer = {n_ecrou : idDet, n_affaire : idAff, nom_juridiction : "Nantes", date_incarceration : Date.now(), motif : motif.n_motif };
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
      let incarcerer = {n_ecrou : idDet, n_affaire : idAff, nom_juridiction : "Nantes", date_incarceration : Date.now(), motif : newMotif.n_motif };
      axios.post('http://localhost:3000/incarceration', incarcerer)
      .then(function (response) {
          res.redirect('/incarceration');
      })
      .catch(function (error) {
          console.log(error);
      });
    })
    .catch(function (error) {
        console.log(error);
    });
})

//-------------------decider condamnation, réduction peine ou libération définitive
//appelle la page pour créer une liberation definitive
app.get('/deciderLiberationDefinitive', function (req, res) {
  axios.get('http://localhost:3000/detenu')
  .then(response => {
      const detenus = response.data;
      res.render("liberationDefinitive.ejs", {detenus: detenus});
  })
  .catch(function (error) {
      console.log(error);
  });
})

//créer une decision puis une liberation definitive
app.post('/deciderLiberationDefinitive', function (req, res) {
    const newL = req.body;
    let decision = {n_type_decision : "3", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision};
    let lib = {n_type_decision : "3", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision, date_liberation : newL.date_liberation};
    axios.post('http://localhost:3000/decision', decision)
    .then(function (response) {
      axios.post('http://localhost:3000/liberationDefinitive', lib)
      .then(function (response) {
          res.redirect('/liberationDefinitive');
      })
      .catch(function (error) {
          console.log(error);
      });
    })
    .catch(function (error) {
        console.log(error);
    });
})


//appelle la page pour créer une condamnation
app.get('/deciderCondamnation', function (req, res) {
  axios.get('http://localhost:3000/detenu')
  .then(response => {
      const detenus = response.data;
      res.render("condamnation.ejs", {detenus: detenus});
  })
  .catch(function (error) {
      console.log(error);
  });
})

//créer une decision puis une condamnation
app.post('/deciderCondamnation', function (req, res) {
    const newL = req.body;
    let decision = {n_type_decision : "1", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision};
    let lib = {n_type_decision : "1", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision, duree : newL.duree};
    axios.post('http://localhost:3000/decision', decision)
    .then(function (response) {
      axios.post('http://localhost:3000/condamnation', lib)
      .then(function (response) {
          res.redirect('/condamnation');
      })
      .catch(function (error) {
          console.log(error);
      });
    })
    .catch(function (error) {
        console.log(error);
    });
})

//appelle la page pour créer une condamnation
app.get('/deciderReductionPeine', function (req, res) {
  axios.get('http://localhost:3000/detenu')
  .then(response => {
      const detenus = response.data;
      res.render("reductionPeine.ejs", {detenus: detenus});
  })
  .catch(function (error) {
      console.log(error);
  });
})

//créer une decision puis une condamnation
app.post('/deciderReductionPeine', function (req, res) {
    const newL = req.body;
    let decision = {n_type_decision : "2", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision};
    let lib = {n_type_decision : "2", n_ecrou : newL.n_ecrou, date_decision : newL.date_decision, duree : newL.duree};
    axios.post('http://localhost:3000/decision', decision)
    .then(function (response) {
      axios.post('http://localhost:3000/reductionPeine', lib)
      .then(function (response) {
          res.redirect('/reductionPeine');
      })
      .catch(function (error) {
          console.log(error);
      });
    })
    .catch(function (error) {
        console.log(error);
    });
})


app.listen(3000, function () {
    console.log('Votre app est disponible sur localhost:3000 !')
})
