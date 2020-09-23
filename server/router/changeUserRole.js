module.exports = function(db, app){
    app.post('/changeUserRole', function(req, res){
        var update_user = {
            'username': req.body.username,
            'role': req.body.role
        }
        db.collection('users').find({username: update_user.username}).toArray().then(function(user){
            user[0].role = update_user.role
            db.collection('users').updateOne({username: update_user.username}, {$set: user[0]}, () => {
                res.send({"feedback": null});
            })
        })
    })
}