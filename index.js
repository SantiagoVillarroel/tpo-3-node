var express = require('express');
var app = express();

app.use(express.static('public'));

var things = require('./things.js');

app.use('/things', things);

app.listen(3000);

//Comment de prueba PRUEBA CLONE