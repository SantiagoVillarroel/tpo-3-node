const ids = ['oficialHistorico', 'blueHistorico', 'mepHistorico', 'turistaHistorico', 'mayoristaHistorico'];//ids de la etiquetas en el html
const nombreTipoDolar = ['oficial', 'blue', 'mep', 'turista', 'mayorista'];
const tipos = ['Oficial', 'Blue', 'MEP', 'Turista', 'Mayorista'];//nombre del dolar que estamos mostrando en pantalla (label dinamico)

const tabla=document.querySelector("#tablaPrecios tbody");

function limpiarTabla(){
    tabla.innerHTML="";
}

function getDatos(nombreTipoDolarRequerido){
    fetch('http://localhost:3000/api/ValoresHistoricosDolar/'+nombreTipoDolarRequerido)
    .then(respuesta => respuesta.json()) //indicamos el formato en el que se desea obtener la informacion
    .then(objeto => 
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
    );
}

ids.forEach(function callback(valorActual, indice){
    document.getElementById(ids[indice]).onclick = function(){
        limpiarTabla();
        getDatos(nombreTipoDolar[indice]);
        document.getElementById('tipoDolarSeleccionado').innerHTML=tipos[indice]; 
    }
})

export {nombreTipoDolar};