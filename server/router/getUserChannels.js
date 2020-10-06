module.exports = function(db, app){
    app.post('/userChannel/getUserChannels', function(req, res){
        var channel_array = []
        var userChannel
        if(req.body.role == "Super Admin" || req.body.role == "Group Admin"){
            db.collection('userChannels').find({}).toArray().then(function(userChannels){
                res.send({"feedback": null, "userChannels": userChannels})
            });
        } else {
            db.collection('groupAssists').find({user_id: req.body.username}).toArray().then(function(groupAssists){
                for(let groupAssist of groupAssists){
                    db.collection('channels').find({group_id: groupAssist.group_id}).toArray().then(function(channels){
                        for(let channel of channels){
                            userChannel = {channel_id: channel.id, user_id: req.body.username}
                            channel_array.push(userChannel)
                        }
                    })
                }
                db.collection('userChannels').find({user_id: req.body.username}).toArray().then(function(userChannels){
                    var newUserChannels = userChannels.concat(channel_array)
                    res.send({"feedback": "this one", "userChannels": newUserChannels})
                });
            })
            
        }
    });
}