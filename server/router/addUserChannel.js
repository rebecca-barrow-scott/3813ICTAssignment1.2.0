module.exports = function(db, app){
    app.post('/addUserChannel', function(req, res){
        db.collection('userChannels').find({channel_id: req.body.channel_id, user_id: req.body.user_id}).toArray().then(function(userChannels){
            if (userChannels.length >= 1){
                db.collection('userChannels').find({}).toArray().then(function(userChannels){
                    res.send({"feedback": "User is already in channel", "userChannels": userChannels})
                });
            } else {
                db.collection('userChannels').insertOne({channel_id: req.body.channel_id, user_id: req.body.user_id}, function(err, result){
                    if (err) throw err;
                    db.collection('userChannels').find({}).toArray().then(function(userChannels){
                        res.send({"feedback": null, "userChannels": userChannels})
                    });
                });
            }
           
        });
    });
};