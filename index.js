const express = require('express');
const https = require('https')
const http = require('http')
const fs = require('fs')
var app = express();

app.use(express.static('public'));

var api = require('./api.js');

app.use('/api', api);

const port = process.env.PORT || 3000;
const port2 = process.env.PORT || 3001;

const httpsOptions = {
  key: fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
}
const serverHTTPS = https.createServer(httpsOptions, app)
  .listen(port, () => {
      console.log('https server running at ' + port)
  })

const serverHTTP = http.createServer(app)
.listen(port2, () => {
    console.log('http server running at ' + port2)
})

//app.listen(port,()=>console.log("Server on Port ",port));
//https.createServer(options, app).listen(port)

//const y let, no var
