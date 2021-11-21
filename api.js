var express = require('express');
var router = express.Router();

router.use(express.static('public'));

/*router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});
router.put('/', function(req, res){
    res.send('PUT route on things.');
 });
 router.delete('/', function(req, res){
    res.send('DELETE route on things.');
 });*/

 router.get('/inicio', function(req, res) {
   res.sendFile(inicio);
});
router.get('/historico', function(req, res) {
   res.sendFile(historico);
});
router.get('/quienesSomos', function(req, res) {
   res.sendFile(quienesSomos);
});

//Prueba con parámetros
router.get('/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });

//Si la url no es válida...
 router.get('*', function(req, res){
    res.send('Error 404 - Sorry, this is an invalid URL.');
 });

//export this router to use in our index.js
module.exports = router;