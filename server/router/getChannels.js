module.exports = function(db, app){
    app.get('/getChannels', function(req, res){
        db.collection('channels').find({}).toArray().then(function(channels){
            res.send({"feedack": null, "channels": channels})
        });
    });
}