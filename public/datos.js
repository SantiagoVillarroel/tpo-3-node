const json='./datos.json';
const tabla=document.querySelector("#tablaPrecios tbody");


function getDatos(){
    fetch('https://localhost:3000/api/valorTiposDeDolarHoy')
    .then(respuesta => respuesta.json()) //indicamos el formato en el que se desea obtener la informacion
    .then(objeto =>{
        console.log(objeto.message);
        objeto.message.forEach(dolar=>{
            const row= document.createElement('tr');
            row.classList.add('border-bottom','border-3','boder-'); //Para estilos (bootstrap)
            //Agrego info a innerHTML
            row.innerHTML+=` 
                <td>${dolar.nombre}</td>
                <td>$${dolar.venta}</td>
                <td>$${dolar.compra}</td>
            `;
            tabla.appendChild(row); //Concateno nueva fila
        }) }   
    );
}

getDatos();