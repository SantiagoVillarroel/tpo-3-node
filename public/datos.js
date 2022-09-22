const tabla=document.querySelector("#tablaPrecios tbody");


function getDatos(){
    fetch('http://localhost:3001/api/valorTiposDeDolarHoy')
    .then(respuesta => respuesta.json()) //indicamos el formato en el que se desea obtener la informacion
    .then(objeto =>{
        //console.log(objeto.message);
        objeto.message.forEach(dolar=>{
            const row= document.createElement('tr');
            row.classList.add('border-bottom','border-3','boder-'); //Para estilos (bootstrap)
            //Agrego info a innerHTML
            row.innerHTML+=` 
                <td>${dolar.nombre}</td>
                <td>$${dolar.dato.venta}</td>
                <td>$${dolar.dato.compra}</td>
            `;
            tabla.appendChild(row); //Concateno nueva fila
        }) }   
    );
}

getDatos();