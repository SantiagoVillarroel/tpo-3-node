const { request } = require('express');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

const datosInicio =  require('./datos.json')

const indiceDeTiposDeDolarValorHistorico= require('./historico_JSON/indiceValoresHistoricosTipoDolar.json');

 router.get('/ValorTiposDeDolarHoy', function(req, res) {
   res.send(datosInicio);
});

router.post('/ValorTiposDeDolarHoy', jsonParser, (req, res) => {
   console.log(req.body);
   const {id, nombre, venta, compra} = req.body;
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      let objeto = {
         "id":id,
         "nombre":nombre,
         "compra":compra,
         "venta":venta
      };
      datosInicio.push(objeto); //Retornar lo creado - almacenar fecha de guardado
      res.send(objeto);
   }else{
      res.sendStatus(400);
   }
});

router.put('/ValorTiposDeDolarHoy', function(req, res) {
   const {id, nombre, venta, compra} = req.body;
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      const indiceEncontrado = datosInicio.findIndex(elem => elem.id===id);
      if(!isNaN(indiceEncontrado)){
         datosInicio[indiceEncontrado].nombre=nombre;
         datosInicio[indiceEncontrado].compra=compra;
         datosInicio[indiceEncontrado].venta=venta;
         res.send(datosInicio[indiceEncontrado]);
      }else{
         res.sendStatus(400);
      }
   }else{
      res.sendStatus(400);
   }
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