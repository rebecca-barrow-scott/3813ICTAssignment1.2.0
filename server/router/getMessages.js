module.exports = function(db, app){
    app.get('/getMessages', function(req, res){
        db.collection('messages').find({}).toArray().then(function(messages){
            res.send({"feedack": null, "messages": messages})
        });
    });
}