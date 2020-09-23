module.exports = function(db, app){
    app.post('/api/auth', function(req, res){
        db.collection('users').find({email: req.body.email}).toArray().then(function(user){
            if (user.length == 0){
                console.log('here')
                res.send({"feedback": "User doesn't exist"})
            } 
            else if (user[0].password != req.body.password){
                console.log(user.password)
                console.log(req.body.password)
                res.send({"feedback": "Password is wrong"})
            }
            else {
                res.send({"feedback": null, "user": user[0]})
            }
        });
    });
};
