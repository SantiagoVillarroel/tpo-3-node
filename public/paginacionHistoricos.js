
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
         cantPaginas = objeto[0].cantidadPaginas; //cantPaginas depende de la cantidad de entradas en el json correspondiente
            
            for (let i = 0; i < cantPaginas; i++) { //Para cada número de pág
                const item = document.createElement('li'); //Creo list item
                const indice = i + 1;
                item.innerHTML = `<a id="${indice}" href="#">${indice}</a>`;
                idsPaginas[i] = indice;
                driver.appendChild(item); //Agrego número a lista de páginas
                document.getElementById(indice).onclick= function(){ //Cuando se clickea una página...
                    limpiarTabla();
                    getDatos(tipoDolar,indice,cantFilasAMostrar);
                };
            }
        });
}



