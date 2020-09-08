var fs = require('fs');
const { getOutputFileNames } = require('typescript');
module.exports = function(req,res){
    var group = {
        'id': null,
        'name': req.body.name
    }
    if (group.name == (null || undefined)){
        res.send('{"feedback": "Create a group name"}')
    } else {
        valid = true
        fs.readFile('../server/data/group.json', 'utf-8', function(err, data){
            if (err) throw err;
            group_array = JSON.parse(data);
            for (check of group_array){
                if (check.name == group.name){
                    valid = false
                }
            }
            if (valid){
                group.id = group_array.length+1;
                group_array.push(group);
                new_data = JSON.stringify(group_array);
                fs.writeFile('../server/data/group.json', new_data, 'utf-8', function(err){
                    if (err) throw err;
                });
                content = {"group": group, "feedback": null};
                res.send(content);
            } else {
                res.send('{"feedback": "Group already taken"}');
            } 
        });  
    }
    
}