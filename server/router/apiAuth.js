module.exports = function(db, app){
    app.post('/api/auth', function(req, res){
        db.collection('users').find({email: req.body.email}).toArray().then(function(user){
            if (user.length == 0){
                res.send({"feedback": "User doesn't exist"})
            } 
            else if (user[0].password != req.body.password){

                res.send({"feedback": "Password is wrong"})
            }
            else {
                res.send({"feedback": null, "user": user[0]})
            }
        });
    });
};
