var fs = require('fs');
const e = require('express');
module.exports = function(req,res){
    var feedback = null;
    var valid = false;
    fs.readFile('../server/data/users.json', 'utf-8', function(err, data){
        if (err) throw err;
        user_data = JSON.parse(data);
        for(user of user_data){
            if(user.username == req.body.username){
                valid = true;
            }
        }
        if(valid){
            feedback = "User Exists";
        } else {
            feedback = "User doesn't exists";
        }
        send_data = {"feedback": feedback};
        res.send(send_data);
    });  
}