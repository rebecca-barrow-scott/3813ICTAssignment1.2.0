module.exports = function(db, app){
    app.post('/userChannel/getUserChannels', function(req, res){
        if(req.body.role == "Super Admin" || req.body.role == "Group Admin"){
            db.collection('userChannels').find({}).toArray().then(function(userChannels){
                res.send({"feedback": null, "userChannels": userChannels})
            });
        } else {
            db.collection('userChannels').find({user_id: req.body.username}).toArray().then(function(userChannels){
                res.send({"feedback": null, "userChannels": userChannels})
            });
        }
    });
}