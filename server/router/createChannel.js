module.exports = function(db, app){
    app.post('/createChannel', function(req, res){
        console.log(req.body);
        db.collection('channels').insertOne(req.body, function(err, result){
            if (err) throw err;
            res.send({'feeback': null})
        });
    });
}

