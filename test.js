const axios = require('axios');
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
    case 'post':
        axios.post('http://localhost:3000/detenu', {
            n_ecrou: "1234",
            prenom: 'Fred',
            nom: 'Flintstone',
            date_naissance : "15/06/1998",
            lieu_naissance : "Pau"
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        break;
    case 'put':
        axios.put('http://localhost:3000/detenu/1234', {
            nom: 'Grenier'
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        break;
    case 'delete':
        axios.delete('http://localhost:3000/detenu/1234')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    default:
        console.log('Option inexistance');
}
