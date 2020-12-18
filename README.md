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
