module.exports = function(db, app){
    app.post('/getGroup', function(req, res){
        db.collection('groups').find({id: parseInt(req.body.id)}).toArray().then(function(groups){
            res.send({"feedack": null, "groups": groups[0]})
        });
    });
}