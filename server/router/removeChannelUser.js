var fs = require('fs');
module.exports = function(req,res){
    var channel_user = {
        'channel_id': req.body.channel_id,
        'user_id': req.body.user_id
    }
    fs.readFile('../server/data/channelUsers.json', 'utf-8', function(err, data){
        if (err) throw err;
        cu_array = JSON.parse(data);
        for (user of cu_array){
            if (user.user_id == channel_user.user_id && user.channel_id == channel_user.channel_id){
                user.channel_id = null
                user.user_id = null
            }
        }
        new_data = JSON.stringify(cu_array);
        fs.writeFile('../server/data/channelUsers.json', new_data, 'utf-8', function(err){
            if (err) throw err;
        });
    });  
    res.send(JSON.parse('{"feedback": null}'));
}