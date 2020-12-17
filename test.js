const axios = require('axios');
var myArgs = process.argv.slice(2);
const fs = require('fs');

console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
    case 'post':
        fs.readFile(myArgs[2], function(erreur, fichier) {
           let dataFile = JSON.parse(fichier);
           axios.post('http://localhost:3000/' + myArgs[1], dataFile)
           .then(function (response) {
              console.log(response);
           })
           .catch(function (error) {
               console.log(error);
           });
        })
        break;
    case 'put':
        fs.readFile(myArgs[3], function(erreur, fichier) {
           let dataFile = JSON.parse(fichier);
            axios.put('http://localhost:3000/' + myArgs[1] + '/' +  myArgs[2], dataFile)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        });
        break;
    case 'delete':
        axios.delete('http://localhost:3000/' + myArgs[1] + '/' +  myArgs[2])
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    default:
        console.log('Option inexistante');
}
