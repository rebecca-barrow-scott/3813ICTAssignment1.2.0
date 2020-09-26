module.exports = function(db, app){
    app.post('/removeUserChannel', function(req, res){
        db.collection('userChannels').deleteOne({channel_id: parseInt(req.body.channel_id), user_id: req.body.user_id}, function(err, result){
            if (err) throw err;
            db.collection('userChannels').find({}).toArray().then(function(userChannels){
                res.send({'feedback': null, 'userChannels': userChannels})
            })
        });
    });
}