var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('My First Nodejs Server!');
    console.log('Server listening on: '+ host + 'port:' + port);
    console.log('Access it here: http://localhost:3000/');
});