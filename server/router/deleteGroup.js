module.exports = function(db, app){
    app.post('/deleteGroup', function(req, res){
        console.log("group"+req.body.id)
        db.collection('groups').deleteOne({id: parseInt(req.body.id)}, function(err, result){
            if (err) throw err;            db.collection('groups').find({}).toArray().then(function(groups){
                res.send({'feedback': null, 'groups': groups})
            })
        });
    });
}