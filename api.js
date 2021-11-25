var express = require('express');
var router = express.Router();

const datosInicio =  require('./datos.json')

const datosHistorico = [require('./historico_JSON/oficialHistorico.json'), require('./historico_JSON/blueHistorico.json'), 
require('./historico_JSON/mepHistorico.json'), require('./historico_JSON/turistaHistorico.json'), 
require('./historico_JSON/mayoristaHistorico.json')];

//router.use(express.static('public'));

 router.get('/inicio', function(req, res) {
   //console.log(req.query);
   res.send(datosInicio);
});

router.post('/inicio/:id/:nombre/:venta/:compra', function(req, res) {
   res.send();
   datosInicio.push({
      "id":req.params.id,
      "nombre":req.params.nombre,
      "compra":req.params.compra,
      "venta":req.params.venta
   });
});

router.put('/inicio', function(req, res) {
   res.send();
});

/*router.get('/historico/:id', function(req, res){
   const cantidad=req.query.cantidad;
   const desde=req.query.desde;
   res.send((datosHistorico[req.params.id]).slice[desde, desde+cantidad]);
});*/

router.get('/historico/:id', function(req, res){
   res.send(datosHistorico[req.params.id]);
});

//Si la url no es válida...
 router.get('*', function(req, res){
    res.send('Error 404 - Sorry, this is an invalid URL.');
 });

//export this router to use in our index.js
module.exports = router;