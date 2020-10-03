module.exports = function(db, app){
    app.post('/createChannel', function(req, res){
        var channel = {
            id: null,
            name: req.body.name,
            group_id: req.body.group_id
        }
        db.collection('channels').find({}).toArray().then(function(channels){
            channel.id = channels.length+1
            db.collection('channels').insertOne(channel, function(err, result){
                if (err) throw err;
                db.collection('channels').find({}).toArray().then(function(c){
                    res.send({'feeback': null, "channels": c, "id": channels.length+1});
                })
            });
        });
    });
}

