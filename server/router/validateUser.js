module.exports = function(db, app){
    app.post('/validateUser', function(req, res){
        var user = {
            'username': req.body.username,
            'email': req.body.email,
            'role': req.body.role,
            'password': req.body.password,
            'confirm_password': req.body.confirm_password
        }

        if (user.username == (null || undefined)){
            res.send({"feedback": "Enter a valid username"});
        } else if (user.email == (null || undefined)){
            res.send({"feedback": "Enter a valid email"});
        } else if (user.role == (null || undefined)){
            res.send({"feedback": "Enter a valid role"});
        } else if (user.password == (null || undefined)){
            res.send({"feedback": "Enter a valid password"});
        } else if (user.password != user.confirm_password){
            res.send({"feedback": "Passwords don\'t match"});
        } else {
            db.collection('users').find({username: user.username}).toArray().then(function(user_username){
                if (user_username.length != 0){
                    res.send({"feedback": "Username is taken", "user": user_username[0]});
                } else {
                    db.collection('users').find({email: user.email}).toArray().then(function(user_email){
                        if (user_email.length != 0){
                            res.send({"feedback": "Email is taken"});
                        } else {
                            res.send({"feedback": null});
                        }
                    });
                }
            });
        }
    });
}