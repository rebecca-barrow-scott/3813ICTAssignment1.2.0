var fs = require('fs');
module.exports = function(req,res){
    var feedback = null;
    var group_data;
    var channel_data;
    fs.readFile('../server/data/channelUsers.json', 'utf-8', function(err, data){
        if (err) throw err;
        data = {"channelUsers": data};
        res.send(data);
        }); 
}