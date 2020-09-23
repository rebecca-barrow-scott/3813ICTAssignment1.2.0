module.exports = function(db, app){
    app.get('/setUserChannelCollection', function(req, res){
        var userChannels = [{"channel_id":2,"user_id":"Mary","role":"Group Assist Admin"},
                            {"channel_id":3,"user_id":"Emma","role":"Member"},
                            {"channel_id":3,"user_id":"Lucy","role":"Group Assist Admin"},
                            {"channel_id":1,"user_id":"Emma","role":"Member"}]
        
        db.collection('userChannels').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('userChannels').insertMany(userChannels, function(err, result){
                if (err) throw err;
                res.send({"feedback": null});
            });
        });
       
    });
}