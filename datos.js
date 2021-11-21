const json='./datos.json';
const tabla=document.querySelector("#tablaPrecios tbody");


function getDatos(){
    fetch(json)
    .then(respuesta => respuesta.json()) //indicamos el formato en el que se desea obtener la informacion
    .then(objeto =>
        objeto.forEach(dolar=>{
            const row= document.createElement('tr');
            row.classList.add('border-bottom','border-3','boder-'); //Para estilos (bootstrap)
            //row.classList.add('border-3');
            
            row.innerHTML+=`
                <td>${dolar.nombre}</td>
                <td>$${dolar.venta}</td>
                <td>$${dolar.compra}</td>
            `;
            tabla.appendChild(row);
        })    
    );
}

getDatos();