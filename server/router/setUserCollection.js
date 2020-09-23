module.exports = function(db, app){
    app.get('/setUserCollection', function(req, res){
        var users = [{"username":"Super","email":"super@gmail.com","password":"super","role":"Super Admin"},
                     {"username":"John","email":"john@gmail.com","password":"123","role":"Group Admin"},
                     {"username":"Rachel","email":"rachel@gmail.com","password":"123","role":"Group Admin"},
                     {"username":"Kyle","email":"kyle@gmail.com","password":"123","role":"Group Assit Admin"},
                     {"username":"Emma","email":"emma@gmail.com","password":"123","role":"User"},
                     {"username":"Mary","email":"mary@gmail.com","password":"123","role":"User"}]
        
        db.collection('users').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('users').insertMany(users, function(err, result){
                if (err) throw err;
                res.send();
            });
        });
       
    });
}