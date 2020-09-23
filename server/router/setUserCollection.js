module.exports = function(db, app){
    app.get('/setUserCollection', function(req, res){
        var users = [{username: "Super", email: "super@gmail.com", role: "Super Admin", password: "123", confirm_password: "123"},
                     {username: "John", email: "john@gmail.com", role: "Group Admin", password: "123", confirm_password: "123"},
                     {username: "Kyle", email: "kyle@gmail.com", role: "Group Admin", password: "123", confirm_password: "123"},
                     {username: "Emma", email: "emma@gmail.com", role: "User", password: "123", confirm_password: "123"},
                     {username: "Mary", email: "mary@gmail.com", role: "User", password: "123", confirm_password: "123"},
                     {username: "rebecca", email: "rebecca@gmail.com", role: "User", password: "123", confirm_password: "123"}]
        
        db.collection('users').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('users').insertMany(users, function(err, result){
                if (err) throw err;
                res.send();
            });
        });
       
    });
}