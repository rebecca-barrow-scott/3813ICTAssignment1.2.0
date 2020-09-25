module.exports = function(db, app){
    app.post('/userChannel/removeChannel', function(req, res){
        db.collection('userChannels').deleteMany({channel_id: req.body.id}, function(err, result){
            if (err) throw err;
            db.collection('userChannels').find({}).toArray().then(function(userChannels){
                res.send({'feedback': null, 'userChannels': userChannels})
            })
        });
    });
}