const { request } = require('express');
let express = require('express');
let router = express.Router();

let manipulacionDatos = require('./manipulacionDatos.js');
const nombreTipoDolar = ['oficial', 'blue', 'mep', 'turista', 'mayorista'];

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

 router.get('/valorTiposDeDolarHoy', function(req, res) {
   res.send(manipulacionDatos.obtenerDatosHoy());
});

router.post('/valorTiposDeDolarHoy', jsonParser, (req, res) => {
   const {id, nombre, venta, compra} = req.body;
   //Validación de datos
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      res.send(manipulacionDatos.crearDatoPaginaInicio(id, nombre, venta, compra));
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});


router.put('/valorTiposDeDolarHoy', jsonParser, function(req, res) {
   const {id, nombre, venta, compra} = req.body;
   //Validación de datos
   if(!isNaN(id) && typeof(nombre)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      let obj = manipulacionDatos.actualizarDatoPaginaInicio(id, nombre, venta, compra);
      if(obj != null){
         res.send(obj);
      }else{
         res.status(404).send('Dato no fue encontrado');
      }
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});

router.post('/valoresHistoricosDolar', jsonParser, (req, res) => {
   const {tipo, fecha, venta, compra} = req.body;
   //Validación de datos
   if(typeof(tipo)==='string' && !isNaN(venta) && !isNaN(compra) && venta>=0 && compra>=0){
      res.send(manipulacionDatos.crearDatoHistorico(tipo, fecha, venta, compra));
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});

router.get('/valoresHistoricosDolar', function(req, res){
   const tipo = req.query.tipo;
   const cantidad=req.query.cantidad;
   const desde=req.query.desde;
   if(typeof(tipo)==='string' && !isNaN(cantidad) && !isNaN(desde)){
      res.send(manipulacionDatos.obtenerHistoricoCantidadDesde(tipo, cantidad, desde));
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});

/*router.get('/valoresHistoricosDolar/:nombreTipoDeDolar/:id', function(req, res){
   let nombre = req.params.nombreTipoDeDolar;
   let id = req.params.id;
   if(typeof(nombre) === 'string' && !isNaN(id)){
      res.send(manipulacionDatos.obtenerDatoHistoricoConId(nombre, id));
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});

router.get('/valoresHistoricosDolar/:nombreTipoDeDolar/:fecha', function(req, res){
   let nombre = req.params.nombreTipoDeDolar;
   let fecha = req.params.fecha;
   if(typeof(nombre) === 'string' && typeof(fecha) === 'string'){
      res.send(manipulacionDatos.obtenerDatoHistoricoConFecha(nombre, fecha));
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});*/

router.get('/valoresHistoricosDolar/:nombreTipoDeDolar', function(req, res){
   let nombre = req.params.nombreTipoDeDolar;
   if(typeof(nombre) === 'string' && nombreTipoDolar.find(element => element===nombre) ){
      res.send(manipulacionDatos.obtenerArchivoHistorico(nombre));
   }else{
      res.status(400).send('Los datos no son correctos');
   }
});

router.get('/valoresHistoricosDolar/paginacion/:nombreTipoDeDolar/:numeroPagina/:cantidadEntradas', function(req, res){
   let nombre = req.params.nombreTipoDeDolar;
   let numeroPag = req.params.numeroPagina;
   let cantEntradas = req.params.cantidadEntradas;
   if(typeof(nombre) === 'string' && !isNaN(numeroPag)  && !isNaN(cantEntradas) && nombreTipoDolar.find(element => element===nombre) ){
      res.send({
         "message":
         manipulacionDatos.obtenerHistoricoCantidadDesde(nombre, cantEntradas, (numeroPag-1)*cantEntradas)
      });
   }else{
      res.status(400).send('Los datos no son correctos');
   }
})

router.get('/cantidadDatosHistoricosParaUnTipoDolar/:tipoDolar/:cantidadEntradas', function(req,res){
   let tipoDolar= req.params.tipoDolar;
   let cantEntradas= req.params.cantidadEntradas;
   if(typeof(tipoDolar)=='string' && !isNaN(cantEntradas) && cantEntradas>=0){
      let resp=manipulacionDatos.obtenerCantidadPaginasTipoDolar(tipoDolar,cantEntradas);
      res.send({"message":[{"cantidadPaginas":resp}]});
   }else{
      res.status(400).send('Los datos no son correctos');
   }
})

//Si la url no es válida...
 router.get('*', function(req, res){
    res.status(404).send('Error 404 - Sorry, this is an invalid URL.');
 });

module.exports = router;