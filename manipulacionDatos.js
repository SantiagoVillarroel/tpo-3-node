//Require para obtener datos
const datos =  require('./datos.json')

function obtenerDatosHoy(){
    let datosHoy = {
        "message": []
    };
    datos.message.forEach((elem, i) => datosHoy.message.push({
        "nombre": elem.nombre,
        "dato": elem.datos[0]
    }));//Tener campo aparte en datos.json para valor de hoy?
    return datosHoy;
}

function crearDatoPaginaInicio(id, nombre, venta, compra){
    //Crea objeto a ser insertado
    let objeto = {
        "id":id,
        "nombre":nombre,
        "compra":compra,
        "venta":venta
     };
     datosPaginaInicio.message.push(objeto); //almacenar fecha de guardado?
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

function crearDatoHistorico(tipo, fecha, venta, compra){
    let datosHistoricos = datos.message.find(elem => {
        return elem.nombre.toLowerCase() === tipo;
    });
    let cantElementos = datosHistoricos.length;
    let nuevoElemento = {
        "id": cantElementos+1,
        "fecha": fecha,
        "venta": venta,
        "compra": compra
    }
    datosHistoricos.push(nuevoElemento);
}

/*function obtenerArchivoHistorico(nombreDeTipoDolar){
    //Busco tipo de dólar en indice
    let tipo = indiceDeTiposDeDolarValorHistorico.find(element => {
       return element.tipoDolar === nombreDeTipoDolar;
     }); 
    nombreArchivoHistorico = tipo.nombreArchivo; //Obtengo nombre del archivo JSON correspondiente al tipo de dólar
    return require('./historico_JSON/'+nombreArchivoHistorico);
}*/

function obtenerArchivoHistorico(nombreDeTipoDolar){
    let datosHistoricos = datos.message.find(elem => {
        return elem.nombre.toLowerCase() === nombreDeTipoDolar;
    });
    return datosHistoricos;
}

function obtenerHistoricoCantidadDesde(tipo, cantidad, desde){
    //Obtengo info correspondiente a tipo de dólar
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    return archivoHistorico.datos.slice(desde, parseInt(desde)+parseInt(cantidad)); //Realiza slice y devuelve nuevo arreglo
}//message

/*function obtenerDatoHistoricoConId(tipo, id){
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    let dato = archivoHistorico.find(elem => elem.id===id);
    return dato;
}

function obtenerDatoHistoricoConFecha(tipo, id){
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    let dato = archivoHistorico.find(elem => elem.fecha===fecha);
    return dato;
}*/

function obtenerCantidadPaginasTipoDolar(tipo, cantidadEntradasPorPagina){
    const archivoHistorico = obtenerArchivoHistorico(tipo); //Obtengo info correspondiente a tipo de dólar
    let resp=(Object.keys(archivoHistorico.datos).length) / cantidadEntradasPorPagina; //Divido cantidad de datos por tamaño de página
    return (parseInt(resp))+1;
}

module.exports={
    obtenerDatosHoy,
    crearDatoPaginaInicio,
    actualizarDatoPaginaInicio,
    crearDatoHistorico,
    obtenerArchivoHistorico,
    obtenerHistoricoCantidadDesde,
    /*obtenerDatoHistoricoConId,
    obtenerDatoHistoricoConFecha,*/
    obtenerCantidadPaginasTipoDolar
}