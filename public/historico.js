//const ids = ['oficialHistorico', 'blueHistorico', 'mepHistorico', 'turistaHistorico', 'mayoristaHistorico'];//ids de la etiquetas en el html
const ids = ['oficial', 'blue', 'mep', 'turista', 'mayorista'];
//const tipos = ['Oficial', 'Blue', 'MEP', 'Turista', 'Mayorista'];//nombre del dolar que estamos mostrando en pantalla (label dinamico)

const tabla=document.querySelector("#tablaPrecios tbody");

/*function limpiarTabla(){
    tabla.innerHTML="";
}*/
function limpiarListaPaginas(){
    document.querySelector("#listaPaginas").innerHTML="";
}

ids.forEach(function callback(valorActual, indice){
    document.getElementById(valorActual).onclick = function(){
        limpiarTabla();
        limpiarListaPaginas();
        getDatos(valorActual,1,10); //Página inicia con primeras 10 entradas
        document.getElementById('tipoDolarSeleccionado').innerHTML=valorActual.charAt(0).toUpperCase() + valorActual.slice(1);
        paginacion(valorActual);       
    }
})

