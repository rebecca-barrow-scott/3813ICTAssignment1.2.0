var fs = require('fs');
module.exports = function(req,res){
    var channel_user = {
        'group_id': req.body.group_id,
        'username': req.body.username,
        'channels': req.body.channels
    }
    fs.readFile('../server/data/channelUsers.json', 'utf-8', function(err, data){
        if (err) throw err;
        cu_array = JSON.parse(data);
        for (cu of cu_array){
            if (cu.user_id == channel_user.username){
                cu.role = "Group Assist Admin"
            }
        }
        new_data = JSON.stringify(cu_array);
        fs.writeFile('../server/data/channelUsers.json', new_data, 'utf-8', function(err){
            if (err) throw err;
        });
    });  
    res.send(JSON.parse('{"feedback": null}'));
}