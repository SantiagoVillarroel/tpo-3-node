var express = require('express');
var app = express();
//var path = require('path');

app.use(express.static('public'));

//var public = path.join(__dirname, 'public');

var api = require('./api.js');

app.use('/api', api);

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log("Server on Port ",port));

//Comment de prueba PRUEBA CLONE

//const y let, no var - variable de entorno nro de puerto
