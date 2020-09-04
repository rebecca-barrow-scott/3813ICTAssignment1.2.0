var fs = require('fs');
module.exports = function(req,res){
    fs.readFile('../server/data/users.json', 'utf-8', function(err, data){
        if (err) throw err;
        users_obj = JSON.parse(data);
        user = {}
        for(var i=0; i<users_obj.length; i++){
            if(users_obj[i].email == req.body.email && users_obj[i].password == req.body.password){
                users_obj[i].valid = true
                user = users_obj[i]
            }
        }
    parse_data = JSON.parse(JSON.stringify(user));
    res.send(parse_data);
    });  
}