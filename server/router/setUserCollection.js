module.exports = function(db, app){
    app.get('/setUserCollection', function(req, res){
        var users = [{"username":"Super","email":"super@gmail.com","password":"super","role":"Super Admin","img":"dots2.png"},
                     {"username":"John","email":"john@gmail.com","password":"123","role":"Group Admin","img":"dots2.png"},
                     {"username":"Rachel","email":"rachel@gmail.com","password":"123","role":"Group Admin","img":"dots2.png"},
                     {"username":"Kyle","email":"kyle@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Emma","email":"emma@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Mary","email":"mary@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Rebecca","email":"rebecca@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Amanda","email":"amanda@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Travis","email":"travis@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Mike","email":"mike@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Sabrina","email":"sabrina@gmail.com","password":"123","role":"User","img":"dots2.png"},
                     {"username":"Lucy","email":"lucy@gmail.com","password":"123","role":"User","img":"dots2.png"}]
        
        db.collection('users').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('users').insertMany(users, function(err, result){
                if (err) throw err;
                res.send();
            });
        });
       
    });
}