var fs = require('fs');
module.exports = function(req,res){
    var channel = {
        'channel_id': req.body.channel_id
    }
    fs.readFile('../server/data/channel.json', 'utf-8', function(err, data){
        if (err) throw err;
        channel_array = JSON.parse(data);
        for (c of channel_array){
            if (channel.channel_id == c.id){
                c.id = null
                c.name = null
                c.group_id = null
            }
        }
        new_data = JSON.stringify(channel_array);
        fs.writeFile('../server/data/channel.json', new_data, 'utf-8', function(err){
            if (err) throw err;
        });
    });  
    res.send(JSON.parse('{"feedback": null}'));
}