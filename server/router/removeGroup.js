var fs = require('fs');
module.exports = function(req,res){
    var group = {
        'id': req.body.group_id
    }
    fs.readFile('../server/data/group.json', 'utf-8', function(err, data){
        if (err) throw err;
        group_array = JSON.parse(data);
        for (g of group_array){
            if (group.id == g.id){
                g.id = null
                g.name = null
            }
        }
        new_data = JSON.stringify(group_array);
        fs.writeFile('../server/data/group.json', new_data, 'utf-8', function(err){
            if (err) throw err;
        });
    });  
    res.send(JSON.parse('{"feedback": null}'));
}