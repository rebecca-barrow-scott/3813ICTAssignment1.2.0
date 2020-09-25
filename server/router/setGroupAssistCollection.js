module.exports = function(db, app){
    app.get('/setGroupAssistCollection', function(req, res){
        var groupAssists = [{"group_id":1,"user_id":"Kyle"},
                            {"group_id":1,"user_id":"Amanda"},
                            {"group_id":1,"user_id":"Sabrina"},
                            {"group_id":2,"user_id":"Mike"},
                            {"group_id":2,"user_id":"Rebecca"},]
        
        db.collection('groupAssists').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('groupAssists').insertMany(groupAssists, function(err, result){
                if (err) throw err;
                res.send({"feedback": null});
            });
        });
       
    });
}