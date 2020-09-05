var fs = require('fs');
module.exports = function(req,res){
    var user = {
        'username': req.body.username,
        'email': req.body.email,
        'role': req.body.role,
        'password': req.body.password,
        'valid': false
    }
    var confirm_password= req.body.confirm_password
    if (user.username == (null || undefined)){
        res.send(JSON.parse('{"feedback": "Enter a valid username"}'));
    } else if (user.email == (null || undefined)){
        res.send(JSON.parse('{"feedback": "Enter a valid email"}'));
    } else if (user.role == (null || undefined)){
        res.send(JSON.parse('{"feedback": "Enter a valid role"}'));
    } else if (user.password == (null || undefined)){
        res.send(JSON.parse('{"feedback": "Enter a valid password"}'));
    } else if (user.password != confirm_password){
        res.send(JSON.parse('{"feedback": "Passwords don\'t match"}'));
    } else {
        valid = true
        fs.readFile('../server/data/users.json', 'utf-8', function(err, data){
            if (err) throw err;
            users_array = JSON.parse(data);
            for (user_check of users_array){
                if (user_check.username == user.username){
                    valid = false
                }
            }
            if (valid){
                users_array.push(user);
                new_data = JSON.stringify(users_array);
                fs.writeFile('E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\server\\data\\users.json', new_data, 'utf-8', function(err){
                    if (err) throw err;
                });
                
                res.send(JSON.parse('{"feedback": null}'));
            } else {
                res.send(JSON.parse('{"feedback": "Username already taken"}'));
            } 
        });  
    }
}