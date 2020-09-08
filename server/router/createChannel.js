var fs = require('fs');
module.exports = function(req,res){
    var channel = {
        'id': null,
        'name': req.body.name,
        'group_id': req.body.group_id
    }
    if (channel.name == (null || undefined)){
        channel.name = "New Channel"
    } else {
        fs.readFile('../server/data/channel.json', 'utf-8', function(err, data){
            if (err) throw err;
            channel_array = JSON.parse(data);
            for (check of channel_array){
                if (check.name == channel.name){
                    valid = false
                }
            }
            channel.id = channel_array.length+1;
            channel_array.push(channel);
            new_data = JSON.stringify(channel_array);
            fs.writeFile('../server/data/channel.json', new_data, 'utf-8', function(err){
                if (err) throw err;
            });
            res.send('{"feedback": null}');
        });  
    }
    
}