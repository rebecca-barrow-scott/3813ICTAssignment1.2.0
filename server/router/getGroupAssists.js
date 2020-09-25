module.exports = function(db, app){
    app.get('/getGroupAssists', function(req, res){
        db.collection('groupAssists').find({}).toArray().then(function(groupAssists){
            res.send({"feedack": null, "groupAssists": groupAssists})
        });
    });
}