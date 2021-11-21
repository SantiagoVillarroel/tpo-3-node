const ids = ['oficialHistorico', 'blueHistorico', 'mepHistorico', 'turistaHistorico', 'mayoristaHistorico'];
const tipos = ['Oficial', 'Blue', 'MEP', 'Turista', 'Mayorista'];

const tabla=document.querySelector("#tablaPrecios tbody");

function limpiarTabla(){
    tabla.innerHTML="";
}

function getDatos(index){
    fetch('./Historicos/JSON/'+ids[index]+'.json')
    .then(respuesta => respuesta.json()) //indicamos el formato en el que se desea obtener la informacion
    .then(objeto => {
       // document.querySelector("#tablaPrecios tr").remove();
        objeto.forEach(dolar=>{
            const row= document.createElement('tr');
            row.classList.add('border-bottom','border-3'); //Para estilos (bootstrap)
            //row.classList.add('border-3');
            
            row.innerHTML+=`
                <td>$${dolar.fecha}</td>
                <td>$${dolar.venta}</td>
                <td>$${dolar.compra}</td>
            `;
            tabla.appendChild(row);
        })
    });
}

ids.forEach(function callback(valorActual, indice){
    document.getElementById(ids[indice]).onclick = function(){
        limpiarTabla();
        getDatos(indice);
        document.getElementById('tipoDolarSeleccionado').innerHTML=tipos[indice]; 
    }
})

