//Require para obtener datos
const datosPaginaInicio =  require('./datosPaginaInicio.json')
const indiceDeTiposDeDolarValorHistorico= require('./historico_JSON/indiceValoresHistoricosTipoDolar.json');

function obtenerDatosPaginaInicio(){
    //Devuelve JSON correspondiente
    return datosPaginaInicio;
}

function crearDatoPaginaInicio(id, nombre, venta, compra){
    //Crea objeto a ser insertado
    let objeto = {
        "id":id,
        "nombre":nombre,
        "compra":compra,
        "venta":venta
     };
     datosPaginaInicio.push(objeto); //almacenar fecha de guardado?
     console.log(datosPaginaInicio);
     return objeto; //Devuelve objeto para res.send() en api
}

function actualizarDatoPaginaInicio(id, nombre, venta, compra){
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

 function obtenerArchivoHistorico(nombreDeTipoDolar){
    //Busco tipo de dólar en indice
    let tipo = indiceDeTiposDeDolarValorHistorico.find(element => {
       return element.tipoDolar === nombreDeTipoDolar;
     }); 
    nombreArchivoHistorico = tipo.nombreArchivo; //Obtengo nombre del archivo JSON correspondiente al tipo de dólar
    return require('./historico_JSON/'+nombreArchivoHistorico);
}

function obtenerHistoricoCantidadDesde(tipo, cantidad, desde){
    //Obtengo info correspondiente a tipo de dólar
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    return archivoHistorico.slice(desde, parseInt(desde)+parseInt(cantidad)); //Realiza slice y devuelve nuevo arreglo
}

function obtenerDatoHistoricoConId(tipo, id){
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    let dato = archivoHistorico.find(elem => elem.id===id);
    return dato;
}

function obtenerDatoHistoricoConFecha(tipo, id){
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    let dato = archivoHistorico.find(elem => elem.fecha===fecha);
    return dato;
}

function obtenerCantidadPaginasTipoDolar(tipo, cantidadEntradasPorPagina){
    const archivoHistorico = obtenerArchivoHistorico(tipo); //Obtengo info correspondiente a tipo de dólar
    let resp=(Object.keys(archivoHistorico).length) / cantidadEntradasPorPagina; //Divido cantidad de datos por tamaño de página
    return (parseInt(resp))+1;
}

module.exports={
    obtenerDatosPaginaInicio,
    crearDatoPaginaInicio,
    actualizarDatoPaginaInicio,
    obtenerArchivoHistorico,
    obtenerHistoricoCantidadDesde,
    obtenerDatoHistoricoConId,
    obtenerDatoHistoricoConFecha,
    obtenerCantidadPaginasTipoDolar
}