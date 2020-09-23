module.exports = function(db, app){
    app.get('/getGroups', function(req, res){
        db.collection('groups').find({}).toArray().then(function(groups){
            res.send({"feedack": null, "groups": groups})
        });
    });
}