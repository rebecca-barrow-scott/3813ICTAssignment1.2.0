var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
app.use(express.static(path.join(__dirname, '../dist/chattyapp/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

MongoClient.connect(url, {poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
    const dbName = "mydb";
    const db = client.db(dbName);
    // USER
    require('./router/apiAuth')(db, app);
    require('./router/setUserCollection')(db, app);
    require('./router/getAllUsers')(db, app);
    require('./router/deleteAllUsers')(db, app);
    require('./router/validateUser')(db, app);
    require('./router/createUser')(db, app);
    require('./router/changeUserRole')(db, app);
    
    // GROUP
    require('./router/setGroupCollection')(db, app);
    require('./router/getGroups')(db, app);
    require('./router/createGroup')(db, app);
    require('./router/validateGroup')(db, app);
    require('./router/getGroup')(db, app);

    // CHANNEL
    require('./router/setChannelCollection')(db, app);
    require('./router/getChannels')(db, app);
    require('./router/createChannel')(db, app);
    require('./router/validateChannel')(db, app);

    // USERCHANNEL
    require('./router/setUserChannelCollection')(db, app);
    require('./router/getUserChannels')(db, app);
    

    let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Server listening on: '+ host + 'port:' + port);
    console.log('Access it here: http://localhost:3000/');
    });
});
// app.post('/searchUser', require('./router/searchUser'));
// app.post('/addUserChannel', require('./router/addUserChannel'));
// app.post('/removeChannelUser', require('./router/removeChannelUser'));
// app.post('/removeChannel', require('./router/removeChannel'));
// app.post('/removeGroup', require('./router/removeGroup'));
// app.post('/changeRoleGroup', require('./router/changeRoleGroup'));

// let server = http.listen(3000, function () {
//     let host = server.address().address;
//     let port = server.address().port;
//     console.log('Server listening on: '+ host + 'port:' + port);
//     console.log('Access it here: http://localhost:3000/');
// });