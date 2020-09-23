module.exports = function(db, app){
    app.post('/validateChannel', function(req, res){
        var channel = {
            'id': null,
            'name': req.body.name,
            'group_id': req.body.group_id
        }
        if (channel.name == (null || undefined)){
            channel.name = "New Channel";
        } else {
            db.collection('channels').find({name: channel.name}).toArray().then(function(check_channels){
                if (check_channels.length == 0){
                    db.collection('channels').find({}).toArray().then(function(channels){
                        channel.id = channels.length+1
                        res.send({'feeback': null, 'channel': channel})
                    });
                } else {
                    res.send({"feedback": "Channel name is already taken"})
                }
            })
        }
    });
}
