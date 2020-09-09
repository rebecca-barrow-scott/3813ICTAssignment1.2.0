var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);

app.use(express.static(path.join(__dirname, '../dist/chattyapp/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.post('/api/auth', require('./router/apiAuth'));
app.post('/getUsers', require('./router/getUSers'));
app.post('/createUser', require('./router/createUser'));
app.post('/changeRole', require('./router/changeRole'));
app.post('/deleteUsers', require('./router/deleteUsers'));
app.post('/getGroups', require('./router/getGroups'));
app.post('/searchUser', require('./router/searchUser'));
app.post('/getChannel', require('./router/getChannel'));
app.post('/addUserChannel', require('./router/addUserChannel'));
app.post('/getChannelUsers', require('./router/getChannelUsers'));
app.post('/createGroup', require('./router/createGroup'));
app.post('/createChannel', require('./router/createChannel'));
app.post('/removeChannelUser', require('./router/removeChannelUser'));
app.post('/removeChannel', require('./router/removeChannel'));
app.post('/removeGroup', require('./router/removeGroup'));
app.post('/changeRoleGroup', require('./router/changeRoleGroup'));

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Server listening on: '+ host + 'port:' + port);
    console.log('Access it here: http://localhost:3000/');
});