module.exports = function(db, app){
    app.get('/setUserCollection', function(req, res){
        var users = [{"username":"Super","email":"super@gmail.com","password":"super","role":"Super Admin"},
                     {"username":"John","email":"john@gmail.com","password":"123","role":"Group Admin"},
                     {"username":"Rachel","email":"rachel@gmail.com","password":"123","role":"Group Admin"},
                     {"username":"Kyle","email":"kyle@gmail.com","password":"123","role":"User"},
                     {"username":"Emma","email":"emma@gmail.com","password":"123","role":"User"},
                     {"username":"Mary","email":"mary@gmail.com","password":"123","role":"User"},
                     {"username":"Rebecca","email":"rebecca@gmail.com","password":"123","role":"User"},
                     {"username":"Amanda","email":"amanda@gmail.com","password":"123","role":"User"},
                     {"username":"Travis","email":"travis@gmail.com","password":"123","role":"User"},
                     {"username":"Mike","email":"mike@gmail.com","password":"123","role":"User"},
                     {"username":"Sabrina","email":"sabrina@gmail.com","password":"123","role":"User"}]
        
        db.collection('users').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('users').insertMany(users, function(err, result){
                if (err) throw err;
                res.send();
            });
        });
       
    });
}