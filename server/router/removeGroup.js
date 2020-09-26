module.exports = function(db, app){
    app.post('/removeGroup', function(req, res){
        db.collection('groupAssists').deleteMany({group_id: parseInt(req.body.id)}, function(err, result){
            if (err) throw err;
            db.collection('groupAssists').find({}).toArray().then(function(groupAssists){
                res.send({'feedback': null, 'groupAssists': groupAssists})
            })
        });
    });
}