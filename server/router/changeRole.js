var fs = require('fs');
module.exports = function(req,res){
    var update_user = {
        'username': req.body.username,
        'role': req.body.role
    }
    fs.readFile('../server/data/users.json', 'utf-8', function(err, data){
        if (err) throw err;
        users_array = JSON.parse(data);
        for (user of users_array){
            if (user.username == update_user.username){
                user.role = update_user.role
            }
        }
        new_data = JSON.stringify(users_array);
        fs.writeFile('E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\server\\data\\users.json', new_data, 'utf-8', function(err){
            if (err) throw err;
        });
    });  
    res.send(JSON.parse('{"feedback": null}'));
}