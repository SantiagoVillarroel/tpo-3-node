//Require para obtener datos
const datos =  require('./datos.json')

function obtenerDatosHoy(){
    let datosHoy = {
        "message": []
    };
    datos.message.forEach((elem, i) => datosHoy.message.push({
        "id": elem.nombre.toLowerCase() + 0,
        "tipo": elem.nombre,
        "fecha": elem.datos[0].fecha,
        "venta": elem.datos[0].venta,
        "compra": elem.datos[0].compra
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
    let cantElementos = datosHistoricos.datos.length;
    let nuevoElemento = {
        "id": tipo + cantElementos,
        "tipo": tipo,
        "fecha": fecha,
        "venta": venta,
        "compra": compra
    }
    datosHistoricos.datos.push(nuevoElemento);
    datosHistoricos.datos.sort((a, b) => {
        return +new Date(b.fecha) - +new Date(a.fecha)
    })
    console.log(datosHistoricos);
    return nuevoElemento;
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
        return elem.nombre.toLowerCase() === nombreDeTipoDolar.toLowerCase();
    });
    let datosRes = {
        "message": []
    };
    let nombre = datosHistoricos.nombre
    datosHistoricos.datos.forEach((elem, i) => {
        datosRes.message.push({
            "id": nombre.toLowerCase() + i,
            "tipo": nombre,
            "fecha": elem.fecha,
            "venta": elem.venta,
            "compra": elem.compra
        })
    })
    return datosRes;
}

function obtenerHistoricoCantidadDesde(tipo, cantidad, desde){
    //Obtengo info correspondiente a tipo de dólar
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    console.log(tipo, cantidad, desde)
    const res = archivoHistorico.message.slice(desde, parseInt(desde)+parseInt(cantidad));
    console.log(res)
    return res //Realiza slice y devuelve nuevo arreglo
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