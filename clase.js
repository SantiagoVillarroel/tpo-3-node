const datosInicio =  require('./datos.json')

const indiceDeTiposDeDolarValorHistorico= require('./historico_JSON/indiceValoresHistoricosTipoDolar.json');

exports.prueba = function prueba(){
    console.log('PROBANDO');
}
exports.obtenerDatosInicio = function obtenerDatosInicio(){
    return datosInicio;
}
exports.crearDatoInicio = function crearDatoInicio(id, nombre, venta, compra){
    let objeto = {
        "id":id,
        "nombre":nombre,
        "compra":compra,
        "venta":venta
     };
     datosInicio.push(objeto); //almacenar fecha de guardado?
     return objeto;
}
exports.actualizarDatoInicio = function actualizarDatoInicio(id, nombre, venta, compra){
    const indiceEncontrado = datosInicio.findIndex(elem => elem.id===id);
    let res;
    if(!isNaN(indiceEncontrado)){
       datosInicio[indiceEncontrado].nombre=nombre;
       datosInicio[indiceEncontrado].compra=compra;
       datosInicio[indiceEncontrado].venta=venta;
       res = datosInicio[indiceEncontrado];
    }else{
        res=null;
    }
    return res;
}
exports.obtenerNombreArchivoHistorico = function obtenerNombreArchivoHistorico(nombreDeTipoDolar){
    let tipo = indiceDeTiposDeDolarValorHistorico.find(element => {
       return element.tipoDolar === nombreDeTipoDolar;
     });
    nombreArchivoHistorico = tipo.nombreArchivo;
    return './historico_JSON/'+nombreArchivoHistorico;
}