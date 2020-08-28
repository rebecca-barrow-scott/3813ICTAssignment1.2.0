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

app.post('/api/auth', function(req, res){
    var users = [
        {username: "User1", birthdate: "01/01/1990", age: 30, email: "user1@gmail.com", password: "123", valid: false},
        {username: "User2", birthdate: "01/01/1991", age: 29, email: "user2@gmail.com", password: "123", valid: false},
        {username: "User3", birthdate: "01/01/1993", age: 28, email: "user3@gmail.com", password: "123", valid: false}
    ];
    var value = {};
    var customer = {};
    var user_data = {}
    customer.email = req.body.email;
    customer.password = req.body.password;
    customer.valid = false;
    for(var i=0; i<users.length; i++){
        if(users[i].email == customer.email && users[i].password == customer.password){
            users[i].valid = true
            user_data = users[i]
        }
    }
    parse_data = JSON.parse(JSON.stringify(user_data));
    res.send(parse_data);
});

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('My First Nodejs Server!');
    console.log('Server listening on: '+ host + 'port:' + port);
    console.log('Access it here: http://localhost:3000/');
});