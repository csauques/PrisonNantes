# PrisonNantes

## Description

Dans le cadre du projet, nous avons du créer une architecture micro-services composées de Web services, permettant d'intéragir avec une base de données concernant la gestion de la prison de Nantes.
Les Web servives peuvent servir à incarcérer une prisonnier, à décider d'une condamnation, une réduction de peine ou une libération définitive pour un prisonnier, et de pouvoir voir les prisonniers en préventive. Tout cela accompagné d'un CRUD sur toutes les tables.

Le projet a été crée en Node.js, sur un serveur Express et utilisant un serveur de base de données mongo en ligne.

## Installation

Pour installer le projet, il n'y a besoin que de dézipper le dossier.

Le serveur se lance avec cette commande :
```bash
node serveur.js
```
## Test

### Web Service

Et les tests se lance de plusieurs façon, on va vous détailler comment tester chaque Web Services :
* Pour incarcerer un prisonnier, il suffit juste de taper cette url sur un navigateur : [http://localhost:3000/incarcerer](http://localhost:3000/incarcerer)

* Pour décider d'une réduction de peine, c'est cette url : [http://localhost:3000/deciderReductionPeine](http://localhost:3000/deciderReductionPeine)

* Pour une libération définitive : [http://localhost:3000/deciderLiberationDefinitive](http://localhost:3000/deciderLiberationDefinitive)

* Et pour une condamnation : [http://localhost:3000/deciderCondamnation](http://localhost:3000/deciderCondamnation)

* Et pour voir les prisonniers en préventive : [http://localhost:3000/preventive](http://localhost:3000/preventive)

## CRUD

Mais il n'y a pas que ça, on peut tester le CRUD des différentes tables de la base de données qui sont :
- affaire
- condamnation
- decision
- detenuAffaire
- detenu
- incarceration
- liberationDefinitive
- motif
- reductionPeine

Chaque table a une clé primaire (seule ou composé), les voici pour chaque table :
- affaire : n_affaire, un string de 2 caractères (ex : 44)
- detenu : n_ecrou, un string de 4 caractères (ex : 1963)
- motif : n_affaire, un string de 2 caractères (ex : 01)
- decision : composé de deux clés, n_ecrou et d'une date de format DD/MM/AAAA (ex : 1963/24/02/2006)
- condamnation : composé de deux clés, n_ecrou et d'une date de format DD/MM/AAAA (ex : 1963/24/02/2006)
- liberationDefinitive : composé de deux clés, n_ecrou et d'une date de format DD/MM/AAAA (ex : 1963/24/02/2006)
- reductionPeine : composé de deux clés, n_ecrou et d'une date de format DD/MM/AAAA (ex : 1963/24/02/2006)
- detenuAffaire : composé de deux clés, n_ecrou et n_affaire (ex : 1963/44)

Et pour faire un test, la commande à faire sur un terminal ressemble à cela :

```bash
node test.js operations tableDonnees (idTable) (fichierJson)
```

Il y a 4 opérations :

* CREATE :
```bash
node test.js post Detenu json/detenu.json
```

* READ :         
directement sur un navigateur avec [http://localhost:3000/Detenu](http://localhost:3000/Detenu)      
si vous voulez n'avoir qu'une donnée, ajouter l'id à la fin [http://localhost:3000/Detenu/1963](http://localhost:3000/Detenu/1963) 

* UPDATE
```bash
node test.js put Detenu 1963 json/detenuMod.json
```

* DELETE
```bash
node test.js delete Detenu 1963
```
