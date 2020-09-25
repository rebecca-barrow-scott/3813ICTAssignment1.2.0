module.exports = function(db, app){
    app.post('/deleteChannel', function(req, res){
        db.collection('channels').deleteOne({id: req.body.id}, function(err, result){
            if (err) throw err;
            db.collection('channels').find({}).toArray().then(function(channels){
                res.send({'feedback': null, 'channels': channels})
            })
        });
    });
}