module.exports = function(db, app){
    app.get('/userChannel/setUserChannelCollection', function(req, res){
        var userChannels = [{"channel_id":2,"user_id":"Mary"},
                            {"channel_id":3,"user_id":"Emma"},
                            {"channel_id":3,"user_id":"Lucy"},
                            {"channel_id":1,"user_id":"Emma"},
                            {"channel_id":1,"user_id":"Rebecca"},
                            {"channel_id":2,"user_id":"Rebecca"},
                            {"channel_id":3,"user_id":"Rebecca"},
                            {"channel_id":1,"user_id":"Mike"},
                            {"channel_id":2,"user_id":"Mike"}]
        
        db.collection('userChannels').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('userChannels').insertMany(userChannels, function(err, result){
                if (err) throw err;
                res.send({"feedback": null});
            });
        });
       
    });
}