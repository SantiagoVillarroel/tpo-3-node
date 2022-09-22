//Require para obtener datos
const datos =  require('./datos.json')

//Devuelve datos de hoy con formato
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

//POST histórico
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

//Obtiene datos históricos y les da formato para devolver
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

//Devuelve datos históricos en un rango
function obtenerHistoricoCantidadDesde(tipo, cantidad, desde){
    //Obtengo info correspondiente a tipo de dólar
    const archivoHistorico = obtenerArchivoHistorico(tipo);
    console.log(tipo, cantidad, desde)
    const res = archivoHistorico.message.slice(desde, parseInt(desde)+parseInt(cantidad));
    console.log(res)
    return res //Realiza slice y devuelve nuevo arreglo
}

//Devuelve cantidad de páginas dependiendo de cantidad de entradas de tipo
function obtenerCantidadPaginasTipoDolar(tipo, cantidadEntradasPorPagina){
    const archivoHistorico = obtenerArchivoHistorico(tipo); //Obtengo info correspondiente a tipo de dólar
    let resp=(Object.keys(archivoHistorico.message).length) / cantidadEntradasPorPagina; //Divido cantidad de datos por tamaño de página
    return (parseInt(resp))+1;
}

module.exports={
    obtenerDatosHoy,
    crearDatoHistorico,
    obtenerArchivoHistorico,
    obtenerHistoricoCantidadDesde,
    obtenerCantidadPaginasTipoDolar
}