const datosPaginaInicio =  require('./datosPaginaInicio.json')

const indiceDeTiposDeDolarValorHistorico= require('./historico_JSON/indiceValoresHistoricosTipoDolar.json');

exports.obtenerDatosPaginaInicio = function obtenerDatosPaginaInicio(){
    //Devuelve JSON correspondiente
    return datosPaginaInicio;
}

exports.crearDatoPaginaInicio = function crearDatoPaginaInicio(id, nombre, venta, compra){
    //Crea objeto a ser insertado
    let objeto = {
        "id":id,
        "nombre":nombre,
        "compra":compra,
        "venta":venta
     };
     datosPaginaInicio.push(objeto); //almacenar fecha de guardado?
     return objeto; //Devuelve objeto para res.send() en api
}

exports.actualizarDatoPaginaInicio = function actualizarDatoPaginaInicio(id, nombre, venta, compra){
    //Busco indice de objeto correspondiente a id
    const indiceEncontrado = datosPaginaInicio.findIndex(elem => elem.id===id);
    let res;
    if(!isNaN(indiceEncontrado)){
        //Actualizo datos
       datosPaginaInicio[indiceEncontrado].nombre=nombre;
       datosPaginaInicio[indiceEncontrado].compra=compra;
       datosPaginaInicio[indiceEncontrado].venta=venta;
       res = datosPaginaInicio[indiceEncontrado];
    }else{
        res=null;
    }
    return res;
}

exports.obtenerArchivoHistorico = function obtenerArchivoHistorico(nombreDeTipoDolar){
    //Busco tipo de dólar en indice
    let tipo = indiceDeTiposDeDolarValorHistorico.find(element => {
       return element.tipoDolar === nombreDeTipoDolar;
     });
    nombreArchivoHistorico = tipo.nombreArchivo; //Obtengo nombre del archivo JSON correspondiente al tipo de dólar
    return require('./historico_JSON/'+nombreArchivoHistorico);
}

function obtenerArchivoHistorico(nombreDeTipoDolar){
    //Busco tipo de dólar en indice
    let tipo = indiceDeTiposDeDolarValorHistorico.find(element => {
       return element.tipoDolar === nombreDeTipoDolar;
     });
    nombreArchivoHistorico = tipo.nombreArchivo; //Obtengo nombre del archivo JSON correspondiente al tipo de dólar
    return require('./historico_JSON/'+nombreArchivoHistorico);
}

exports.obtenerHistoricoCantidadDesde = function obtenerHistoricoCantidadDesde(tipo, cantidad, desde){
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    return archivoHistorico.slice(desde, parseInt(desde)+parseInt(cantidad));
}

exports.obtenerDatoHistoricoConId = function obtenerDatoHistoricoConId(tipo, id){
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    let dato = archivoHistorico.find(elem => elem.id===id);
    return dato;
}

exports.obtenerDatoHistoricoConFecha = function obtenerDatoHistoricoConFecha(tipo, id){
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    let dato = archivoHistorico.find(elem => elem.fecha===fecha);
    return dato;
}