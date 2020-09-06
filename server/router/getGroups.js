var fs = require('fs');
module.exports = function(req,res){
    var feedback = null;
    var group_data;
    var channel_data;
    fs.readFile('../server/data/group.json', 'utf-8', function(err, data){
        // if (err){
        //     feedback = "Error"
        // }
        if (err) throw err;
        group_data = data;
        fs.readFile('../server/data/channel.json', 'utf-8', function(err, data){
            if (err) throw err;
            channel_data = data;
            data = {"groups": group_data, "channels": channel_data, "feedback": feedback};
            res.send(data);
        }); 
    }); 
    
}