//require statements
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);

app.use(express.static(path.join(__dirname, '../dist/chattyapp/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.post('/api/auth', function(req, res){
    var users = [
        {username: "Super", email: "super@gmail.com", password: "super", role: "Super Admin", valid: false},
        {username: "John", email: "john@gmail.com", password: "123", role: "Group Admin", valid: false},
        {username: "Rachel", email: "rachel@gmail.com", password: "123", role: "Group Admin", valid: false},
        {username: "Kyle", email: "kyle@gmail.com", password: "123", role: "Group Assit Admin", valid: false},
        {username: "Emma", email: "emma@gmail.com", password: "123", role: "User", valid: false},
        {username: "Mary", email: "mary@gmail.com", password: "123", role: "User", valid: false}
    ];
    fs.writeFile('E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\server\\data\\users.json', JSON.stringify(users), 'utf-8', function(err){
        if (err) throw err;
    });

    fs.readFile('E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\server\\data\\users.json', 'utf-8', function(err, data){
        if (err) throw err;
        users_obj = JSON.parse(data);
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
});

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('My First Nodejs Server!');
    console.log('Server listening on: '+ host + 'port:' + port);
    console.log('Access it here: http://localhost:3000/');
});