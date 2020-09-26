module.exports = function(db, app){
    app.post('/changeUserChannelRole', function(req, res){
        for(let channel of req.body.channels){
            db.collection('userChannels').deleteOne({channel_id: parseInt(channel.id), user_id: req.body.username}), function(err,result){
                if (err) throw err;
            }
        }
        db.collection('userChannels').find({}).toArray().then(function(userChannels){
            db.collection('groupAssists').insertOne({group_id: parseInt(req.body.group_id), user_id: req.body.username}, function(err, result){
                if (err) throw err;
                db.collection('groupAssists').find({}).toArray().then(function(groupAssists){
                    res.send({"feedback": null, "userChannels": userChannels, "groupAssists": groupAssists});
                })

            });
        });
    });
}