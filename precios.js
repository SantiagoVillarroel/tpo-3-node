const  APU_URL="https://api-dolar-argentina.herokuapp.com";


const HTMLResponse=document.querySelector("#inicio");
const ul=document.createDocumentFragment();

fetch(`${APU_URL}/api/all`)
    .then((response)=>response.json())
    .then((precios)=>{
        precios.forEach((precio)=>{
            let elem= document.createElement("li");
            elem.appendChild(
                document.createTextNode(`${precio.fecha, precio.venta, precio.compra}`)
            );
            ul.appendChild(elem);
        });
        HTMLResponse.appendChild(ul);
    })