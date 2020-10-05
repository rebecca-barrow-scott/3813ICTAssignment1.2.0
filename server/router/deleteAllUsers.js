module.exports = function(db, app){
    app.get('/deleteAllUsers', function(req, res){
        db.collection('users').deleteMany({}, function(err, result){
            if (err) throw err;
            res.send({'feedback': null, 'deletedCount': result.deletedCount})
        });
    });
}