# PrisonNantes
Projet SOA

Dans le cadre du projet, nous avons du créer une architecture micro-services composées de Web services, permettant d'intéragir avec une base de données concernant la gestion de la prison de Nantes.
Les Web servives peuvent servir à incarcérer une prisonnier, à décider d'une condamnation, une réduction de peine ou une libération définitive pour un prisonnier, et de pouvoir voir les prisonniers en préventive. Tout cela accompagné d'un CRUD sur toutes les tables.

Le projet a été crée en Node.js, sur un serveur Express et utilisant un serveur de base de données mongo en ligne.

Pour installer le projet, il n'y a besoin que de dézipper le dossier.

Le serveur se lance avec cette commande :
- node serveur.js

Et les tests se lance de plusieurs façon, on va vous détailler comment tester chaque Web Services :
* Pour incarcerer un prisonnier, il suffit juste de taper cette url sur un navigateur :
- http://localhost:3000/incarcerer

* Pour décider d'une réduction de peine, c'est cette url :
- http://localhost:3000/deciderReductionPeine

* Pour une libération définitive :
- http://localhost:3000/deciderLiberationDefinitive

* Et pour une condamnation :
- http://localhost:3000/deciderCondamnation

* Et pour voir les prisonniers en préventive :
- http://localhost:3000/preventive

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

Et pour faire un test, la commande à faire sur un terminal ressemble à cela :
- node test.js operations tableDonnees (idTable) (fichierJson)

Il y a 4 opérations :
* CREATE :
- node test.js post Detenu json/detenu.json

* READ :
- directement sur un navigateur avec http://localhost:3000/<nomtable>(/<id> si on ne veut chercher qu'une donnée)

* UPDATE
- node test.js put Detenu 1963 json/detenuMod.json

* DELETE
- node test.js delete Detenu 1963
