var express = require('express');
var router = express.Router();

const datosInicio =  require('./datos.json')

const datosHistorico = [require('./historico_JSON/oficialHistorico.json'), require('./historico_JSON/blueHistorico.json'), 
require('./historico_JSON/mepHistorico.json'), require('./historico_JSON/turistaHistorico.json'), 
require('./historico_JSON/mayoristaHistorico.json')];

//router.use(express.static('public'));

 router.get('/inicio', function(req, res) {
   console.log(req.query);
   res.send(datosInicio);
});

router.get('/historico/:id', function(req, res){
   res.send(datosHistorico[req.params.id]);
});

//Si la url no es válida...
 router.get('*', function(req, res){
    res.send('Error 404 - Sorry, this is an invalid URL.');
 });

//export this router to use in our index.js
module.exports = router;