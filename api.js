const { request } = require('express');
var express = require('express');
var router = express.Router();

let manipulacionDatos = require('./manipulacionDatos.js');

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

 router.get('/ValorTiposDeDolarHoy', function(req, res) {
   res.send(manipulacionDatos.obtenerDatosPaginaInicio());
});

router.post('/ValorTiposDeDolarHoy', jsonParser, (req, res) => {
   console.log(req.body);
   const {id, nombre, venta, compra} = req.body;
   //Validación de datos
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      res.send(manipulacionDatos.crearDatoPaginaInicio(id, nombre, venta, compra));
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});

router.put('/ValorTiposDeDolarHoy', jsonParser, function(req, res) {
   const {id, nombre, venta, compra} = req.body;
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      let obj = manipulacionDatos.actualizarDatoPaginaInicio(id, nombre, venta, compra);
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
   //librerias para validar - joi
   const tipo = req.query.tipo;
   const cantidad=req.query.cantidad;
   const desde=req.query.desde;
   if(typeof(tipo)==='string' && !isNaN(cantidad) && !isNaN(desde)){
      res.send(manipulacionDatos.obtenerHistoricoCantidadDesde(tipo, cantidad, desde));
   }else{
      res.sendStatus(400);
   }
});

router.get('/ValoresHistoricosDolar/:nombreTipoDeDolar/:id', function(req, res){
   let nombre = req.params.nombreTipoDeDolar;
   let id = req.params.id;
   if(typeof(nombre) === 'string' && !isNaN(id)){
      res.send(manipulacionDatos.obtenerDatoHistoricoConId(nombre, id));
   }else{
      res.sendStatus(400);
   }
});

router.get('/ValoresHistoricosDolar/:nombreTipoDeDolar/:fecha', function(req, res){
   let nombre = req.params.nombreTipoDeDolar;
   let fecha = req.params.fecha;
   if(typeof(nombre) === 'string' && typeof(fecha) === 'string'){
      res.send(manipulacionDatos.obtenerDatoHistoricoConFecha(nombre, fecha));
   }else{
      res.sendStatus(400);
   }
});

router.get('/ValoresHistoricosDolar/:nombreTipoDeDolar', function(req, res){
   let nombre = req.params.nombreTipoDeDolar;
   if(typeof(nombre) === 'string'){
      res.send(manipulacionDatos.obtenerArchivoHistorico(nombre));
   }else{
      res.sendStatus(400);
   }
});

//Si la url no es válida...
 router.get('*', function(req, res){
    res.send('Error 404 - Sorry, this is an invalid URL.');
 });

module.exports = router;