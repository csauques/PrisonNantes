//use Prison;

db.createCollection("Affaire");
db.createCollection("Condamnation");
db.createCollection("Decision");
db.createCollection("DetenuAffaire");
db.createCollection("Detenu");
db.createCollection("Incarceration");
db.createCollection("LiberationDefinitive");
db.createCollection("Motif");
db.createCollection("ReductionPeine");

db.Affaire.createIndex({ n_affaire:1 } , {unique:true});

db.Affaire.insertOne({
    n_affaire:"44",
    nom_juridiction: "Nantes",
    date_faits: "17/12/1995"
});

db.Condamnation.createIndex({ n_ecrou:1, date_decision:1 } , {unique:true});

db.Condamnation.insertOne({
    n_type_decision:"1",
    n_ecrou: "1963",
    date_decision : "22/11/2006",
    duree : 10
});

db.Decision.createIndex({ n_ecrou:1, date_decision:1 } , {unique:true});

db.Decision.insertOne({
    n_type_decision:"1",
    n_ecrou: "1963",
    date_decision: "22/11/2006"
});

db.Decision.insertOne({
    n_type_decision:"3",
    n_ecrou: "1964",
    date_decision: "23/11/2006"
});

db.DetenuAffaire.createIndex({ n_ecrou:1, n_affaire:1 } , {unique:true});

db.DetenuAffaire.insertOne({
  n_ecrou:"1993",
  n_affaire: "44",
  nom_juridiction: "Nantes"
});

db.Detenu.createIndex({ n_ecrou:1 } , {unique:true});

db.Detenu.insertOne({
    n_ecrou:"1963",
    prenom: "Franck",
    nom: "Barbier",
    date_naissance: "11/01/1963",
    lieu_naissance: "Montbeliard"
});

db.Detenu.insertOne({
    n_ecrou:"1964",
    prenom: "Sophie",
    nom: "Darnal",
    date_naissance: "28/07/1964",
    lieu_naissance: "Besancon"
});

db.Incarceration.createIndex({ n_ecrou:1, n_affaire:1 } , {unique:true});

db.Incarceration.insertOne({
    n_ecrou:"1963",
    n_affaire: "44",
    nom_juridiction : "Nantes" ,
    date_incarceration : "16/04/2008",
    n_motif: "01"
});

db.LiberationDefinitive.createIndex({ n_ecrou:1, date_decision:1 } , {unique:true});

db.LiberationDefinitive.insertOne({
    n_type_decision:"3",
    n_ecrou: "1964",
    date_decision : "23/11/2006" ,
    date_liberation : "01/01/2007"
});

db.Motif.createIndex({ n_motif:1 } , {unique:true});

db.Motif.insertOne({
    n_motif:"01",
    libelle_motif: "vols et délits assimilés"
});

db.ReductionPeine.createIndex({ n_ecrou:1, date_decision:1 } , {unique:true});
