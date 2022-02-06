var express = require('express');
var app = express();



app.use(express.static('public'));

var api = require('./api.js');

app.use('/api', api);

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log("Server on Port ",port));

//const y let, no var
