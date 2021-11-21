const API_URL = 'https://api-dolar-argentina.herokuapp.com';
const tabla = document.querySelector("#tablaPrecios tbody");

//const https = require('https');

fetch(`${API_URL}/api/dolaroficial`)
    .then((response) => response.json())
    .then((users) => {
        console.log(response);
        users.forEach(dolar => {
            const row = document.createElement('tr');
            row.classList.add('border-bottom', 'border-3', 'boder-'); //Para estilos (bootstrap)
            row.innerHTML += `
                <td>Dólar Oficial</td>
                <td>$${dolar.venta}</td>
                <td>$${dolar.compra}</td>
            `;
            tabla.appendChild(row);
        })
    });

/*https.get(`${API_URL}/api/dolaroficial`, (response) => {
    users = response.json;
    console.log(response);
    users.forEach(dolar => {
        const row = document.createElement('tr');
        row.classList.add('border-bottom', 'border-3', 'boder-'); //Para estilos (bootstrap)
        row.innerHTML += `
                <td>Dólar Oficial</td>
                <td>$${dolar.venta}</td>
                <td>$${dolar.compra}</td>
            `;
        tabla.appendChild(row);
    })
});*/