var fs = require('fs');
module.exports = function(req,res){
    var feedback = null;
    var channels = [];
    var channel_data;
    fs.readFile('../server/data/channel.json', 'utf-8', function(err, data){
        if (err) throw err;
        channel_data = JSON.parse(data);
        for (channel of channel_data){
            if (channel.group_id == req.body.id){
                channels.push(channel);
            }
        }
        data = {"channels": channels, "feedback": feedback};
        res.send(data);
    }); 
    
}