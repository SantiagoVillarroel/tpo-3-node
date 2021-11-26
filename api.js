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

//router.use(express.static('public'));

 router.get('/ValorTiposDeDolarHoy', function(req, res) {
   //console.log(req.query);
   res.send(datosInicio);//cambiar nombre de route
});

router.post('/inicio/:id/:nombre/:venta/:compra', function(req, res) {
   //req.body o payload
   datosInicio.push({
      "id":req.params.id,
      "nombre":req.params.nombre,
      "compra":req.params.compra,
      "venta":req.params.venta
   }); //Retornar lo creado - almacenar fecha de guardado
});

router.put('/inicio', function(req, res) {
   res.send();
});

router.get('/dolares', function(req, res){
   //dolares?tipo=blue&cantidad=10&desde=0
   //librerias para validar - joi
   const cantidad=req.query.cantidad;
   const desde=req.query.desde;
   res.send((datosHistorico[req.params.id]).slice[desde, desde+cantidad]);
});

router.get('/ValoresHistoricosDolar/:NombreTipoDeDolar', function(req, res){
   //console.log('ssss');
   let nombreArchivoHistorico;
   fetch(indiceDeTiposDeDolarValorHistorico)
   .then(respuesta => respuesta.json)
   .then(objeto =>
      objeto.forEach(element => {
        if(element.tipoDolar == req.params.NombreTipoDeDolar){
            nombreArchivoHistorico=element.nombreArchivo;
        } 
      })
      
      )

   res.send(request('./historicos_JSON/',nombreArchivoHistorico,'.json'));
});
//req.params.id
//Si la url no es válida...
 router.get('*', function(req, res){
    res.send('Error 404 - Sorry, this is an invalid URL.');
 });

//export this router to use in our index.js
module.exports = router;