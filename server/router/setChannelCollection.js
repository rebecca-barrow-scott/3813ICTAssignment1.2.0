module.exports = function(db, app){
    app.get('/setChannelCollection', function(req, res){
        var channels = [{"id":1,"name":"Channel 1.1","group_id":1},
                        {"id":2,"name":"Channel 1.2","group_id":1},
                        {"id":3,"name":"Channel 1.3","group_id":1},
                        {"id":4,"name":"Channel 2.1","group_id":2},
                        {"id":5,"name":"Channel 2.2","group_id":2},
                        {"id":6,"name":"Channel 3.1","group_id":3}]
        
        db.collection('channels').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('channels').insertMany(channels, function(err, result){
                if (err) throw err;
                res.send({"feedback": null});
            });
        });
       
    });
}