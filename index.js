var express = require('express');
var app = express();
var path = require('path');
inicio = __dirname + '/public/index.html';
historico = __dirname + '/public/historico.html';
quienesSomos = __dirname + '/public/quienesSomos.html';

app.use(express.static('public'));

//var public = path.join(__dirname, 'public');

var api = require('./api.js');

app.use('/api', api);

app.listen(3000);

//Santi gato (charly gil). probando commit desde la bitacora de charlie
//Comment de prueba PRUEBA CLONE
