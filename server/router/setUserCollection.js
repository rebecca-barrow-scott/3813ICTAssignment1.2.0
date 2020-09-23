module.exports = function(db, app){
    app.get('/setUserCollection', function(req, res){
        var users = [{username: "super", email: "super@gmail.com", role: "Super", password: "123", confirm_password: "123"},
                     {username: "rebecca", email: "rebecca@gmail.com", role: "User", password: "123", confirm_password: "123"}]
        db.collection('users').insertMany(users, function(err, result){
            if (err) throw err;
            console.log(result)
            res.send();
        });
    });
}