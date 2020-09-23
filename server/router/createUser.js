module.exports = function(db, app){
    app.post('/createUser', function(req, res){
        var user = {
            'username': req.body.username,
            'email': req.body.email,
            'role': req.body.role,
            'password': req.body.password,
            'confirm_password': req.body.confirm_password
        }
        db.collection('users').insertOne(user, function(err, result){
            if (err) throw err;
            res.send({"feedback": null});
        });
    });
}

