module.exports = function(db, app){
    app.all('/userChannel/getAllUserChannels', function(req, res){
            db.collection('userChannels').find({}).toArray().then(function(userChannels){
                res.send({"feedback": null, "userChannels": userChannels})
            });
    });
}