const { request } = require('express');
var express = require('express');
var router = express.Router();

const datosInicio =  require('./datos.json')
/*
const datosHistorico = [
   require('./historico_JSON/oficialHistorico.json'), 
   require('./historico_JSON/blueHistorico.json'), 
   require('./historico_JSON/mepHistorico.json'), 
   require('./historico_JSON/turistaHistorico.json'), 
   require('./historico_JSON/mayoristaHistorico.json')
];
*/

const indiceDeTiposDeDolarValorHistorico= require('./historico_JSON/indiceValoresHistoricosTipoDolar.json');

 router.get('/ValorTiposDeDolarHoy', function(req, res) {
   //console.log(req.query);
   res.send(datosInicio);
});

router.post('/ValorTiposDeDolarHoy/:id/:nombre/:venta/:compra', function(req, res) {
   //req.body o payload

   datosInicio.push({
      "id":req.params.id,
      "nombre":req.params.nombre,
      "compra":req.params.compra,
      "venta":req.params.venta
   }); //Retornar lo creado - almacenar fecha de guardado
});

router.put('/ValorTiposDeDolarHoy', function(req, res) {
   res.send();
});

router.get('/ValoresHistoricosDolar', function(req, res){
   //dolares?tipo=blue&cantidad=10&desde=0
   //librerias para validar - joi
   const cantidad=req.query.cantidad;
   const desde=req.query.desde;
   res.send((datosHistorico[req.params.id]).slice[desde, desde+cantidad]);
});

router.get('/ValoresHistoricosDolar/:NombreTipoDeDolar', function(req, res){
   let nombreArchivoHistorico;
   let tipo;
   /*indiceDeTiposDeDolarValorHistorico.forEach(element => {
      console.log(element.tipoDolar);
      console.log(req.params.NombreTipoDeDolar)
      if(element.tipoDolar === req.params.NombreTipoDeDolar){
          nombreArchivoHistorico=element.nombreArchivo;
      } 
    });*/
   tipo = indiceDeTiposDeDolarValorHistorico.find(element => {
      return element.tipoDolar === req.params.NombreTipoDeDolar;
    });
   nombreArchivoHistorico = tipo.nombreArchivo;
   res.send(require('./historico_JSON/'+nombreArchivoHistorico));
});

//req.params.id

//Si la url no es válida...
 router.get('*', function(req, res){
    res.send('Error 404 - Sorry, this is an invalid URL.');
 });

//export this router to use in our index.js
module.exports = router;