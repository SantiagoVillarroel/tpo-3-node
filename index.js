var express = require('express');
var app = express();
var path = require('path');
inicio = __dirname + '/inicio.html';
historico = __dirname + '/historico.html';
quienesSomos = __dirname + '/quienesSomos.html';

app.use(express.static('public'));

//var public = path.join(__dirname, 'public');

app.get('/inicio', function(req, res) {
    res.sendFile(inicio);
});
app.get('/historico', function(req, res) {
    res.sendFile(historico);
});
app.get('/quienesSomos', function(req, res) {
    res.sendFile(quienesSomos);
});

var things = require('./things.js');

app.use('/things', things);

app.listen(3000);

//Comment de prueba PRUEBA CLONE