module.exports = function(db, app){
    app.get('/setGroupCollection', function(req, res){
        var groups = [{"id":1,"name":"Group 1"},
                      {"id":2,"name":"Group 2"},
                      {"id":"3","name":"Group 3"}]
        
        db.collection('groups').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('groups').insertMany(groups, function(err, result){
                if (err) throw err;
                res.send({"feedback": null});
            });
        });
       
    });
}