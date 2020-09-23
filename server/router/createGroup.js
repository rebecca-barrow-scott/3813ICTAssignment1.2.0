module.exports = function(db, app){
    app.post('/createGroup', function(req, res){
        db.collection('groups').insertOne(req.body, function(err, result){
            if (err) throw err;
            res.send({'feeback': null, 'group': req.body})
        });
    });
}
