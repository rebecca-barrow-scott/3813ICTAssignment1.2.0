module.exports = function(db, app){
    app.get('/getAllUsers', function(req, res){
        db.collection('users').find({}).toArray().then(function(users){
            res.send({"feedback": null, "users": users});
        });
    });
}