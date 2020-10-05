module.exports = function(db, app){
    app.post('/saveMessage', function(req, res){
        db.collection('messages').insertOne(req.body, function(err, result){
            if (err) throw err;
            db.collection('messages').find({}).toArray().then(function(messages){
                res.send({"feedback": null, "messages": messages})
            });
        });
    });
};