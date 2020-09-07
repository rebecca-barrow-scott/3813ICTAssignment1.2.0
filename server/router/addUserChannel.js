var fs = require('fs');
module.exports = function(req,res){
    var channels = req.body.channels
    var channel_ids = []
    var userChannels = []
    for(channel of channels){
        channel_ids.push(channel.id)
    }
    
    for(id of channel_ids){
        var userChannel ={
            'channel_id': id,
            'user_id': req.body.username
        }
        userChannels.push(userChannel)
    }
    fs.readFile('../server/data/userChannel.json', 'utf-8', function(err, data){
        if (err) throw err;
        userChannel_array = JSON.parse(data);
        user_data = userChannel_array.concat(userChannels);
        new_data = JSON.stringify(user_data);
        fs.writeFile('../server/data//userChannel.json', new_data, 'utf-8', function(err){
            if (err) throw err;
        });
    });  
    res.send({"feedback": null});
}