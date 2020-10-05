var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const formidable = require('formidable')
var sockets = require('./socket.js');
const io = require('socket.io')(http);

const url = 'mongodb://localhost:27017';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/chattyapp/')));
app.use('/images', express.static(path.join(__dirname, './userimages')));

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
    require('./router/imageUpload')(db, app, formidable);
    require('./router/updateImg')(db, app);
    
    // GROUP
    require('./router/setGroupCollection')(db, app);
    require('./router/setGroupAssistCollection')(db, app);
    require('./router/getGroups')(db, app);
    require('./router/getGroupAssists')(db, app);
    require('./router/createGroup')(db, app);
    require('./router/validateGroup')(db, app);
    require('./router/getGroup')(db, app);
    require('./router/deleteGroup')(db, app);
    require('./router/removeGroup')(db, app);


    // CHANNEL
    require('./router/setChannelCollection')(db, app);
    require('./router/getChannels')(db, app);
    require('./router/createChannel')(db, app);
    require('./router/validateChannel')(db, app);
    require('./router/deleteChannel')(db, app);

    // USERCHANNEL
    require('./router/setUserChannelCollection')(db, app);
    require('./router/getUserChannels')(db, app);
    require('./router/getAllUserChannels')(db, app);
    require('./router/removeChannel')(db,app);
    require('./router/addUserChannel')(db,app);
    require('./router/changeUserChannelRole')(db, app);
    require('./router/removeUserChannel')(db, app);

    // MESSAGES
    require('./router/setMessageCollection')(db, app);
    require('./router/getMessages')(db, app);
    require('./router/saveMessage')(db, app);

    // SOCKET
    const PORT = 3000;
    sockets.connect(io, PORT, db, app);

    let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Server listening on: '+ host + 'port:' + port);
    console.log('Access it here: http://localhost:3000/');
    });
});