module.exports = function(db, app){
    app.post('/updateImg', function(req, res){
        var update_user = {
            'username': req.body.username,
            'img': req.body.fileName
        }
        db.collection('users').find({username: update_user.username}).toArray().then(function(user){
            user[0].img = update_user.img
            db.collection('users').updateOne({username: update_user.username}, {$set: user[0]}, () => {
                res.send({"user": user[0]});
            })
        })
    })
}