const express = require('express');
const https = require('https')
const fs = require('fs')
var app = express();

app.use(express.static('public'));

var api = require('./api.js');

app.use('/api', api);

const port = process.env.PORT || 3000;

const httpsOptions = {
  key: fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
}
const server = https.createServer(httpsOptions, app)
  .listen(port, () => {
      console.log('server running at ' + port)
  })

//app.listen(port,()=>console.log("Server on Port ",port));
//https.createServer(options, app).listen(port)

//const y let, no var
