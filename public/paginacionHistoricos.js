
const driver = document.querySelector("#listaPaginas");

let idsPaginas = [];

function limpiarTabla(){
    tabla.innerHTML="";
}

function getDatos(nombreTipoDolarRequerido,numeroPag,cantEntradas){
    fetch('http://localhost:3000/api/valoresHistoricosDolar/paginacion/'+nombreTipoDolarRequerido+'/'+numeroPag+'/'+cantEntradas)
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



function paginacion(tipoDolar) {
    const cantFilasAMostrar = 10;
    let cantPaginas = 0;
    fetch('http://localhost:3000/api/cantidadDatosHistoricosParaUnTipoDolar/' + tipoDolar + '/' + cantFilasAMostrar)
        .then(respuesta => respuesta.json())
        .then(objeto => {
         cantPaginas = objeto[0].cantidadPaginas;
            //console.log("paginacion: " + cantPaginas);
            
            for (let i = 0; i < cantPaginas; i++) {
                const item = document.createElement('li');
                const indice = i + 1;
                item.innerHTML = `<a id="${indice}" href="#">${indice}</a>`;
                idsPaginas[i] = indice;
                driver.appendChild(item);
                document.getElementById(indice).onclick= function(){
                    limpiarTabla();
                    getDatos(tipoDolar,indice,cantFilasAMostrar);
                };
            }
            //console.log(idsPaginas);
        });
}



