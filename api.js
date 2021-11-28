const { request } = require('express');
var express = require('express');
var router = express.Router();

let clase = require('./clase.js');

var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

const datosInicio =  require('./datos.json')

const indiceDeTiposDeDolarValorHistorico= require('./historico_JSON/indiceValoresHistoricosTipoDolar.json');

 router.get('/ValorTiposDeDolarHoy', function(req, res) {
   res.send(clase.obtenerDatosInicio());
   clase.prueba();
});

router.post('/ValorTiposDeDolarHoy', jsonParser, (req, res) => {
   console.log(req.body);
   const {id, nombre, venta, compra} = req.body;
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      res.send(clase.crearDatoInicio(id, nombre, venta, compra));
   }else{
      res.sendStatus(400);
   }
});

router.put('/ValorTiposDeDolarHoy', function(req, res) {
   const {id, nombre, venta, compra} = req.body;
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      let obj = clase.actualizarDatoInicio(id, nombre, venta, compra);
      if(obj != null){
         res.send(obj);
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
   let nombre = req.params.NombreTipoDeDolar;
   if(typeof(nombre) === 'string'){
      res.send(clase.obtenerNombreArchivoHistorico(nombre));
   }else{
      res.sendStatus(400);
   }
});

//Si la url no es válida...
 router.get('*', function(req, res){
    res.send('Error 404 - Sorry, this is an invalid URL.');
 });

module.exports = router;