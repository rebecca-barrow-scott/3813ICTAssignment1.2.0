var fs = require('fs');
module.exports = function(req,res){
    fs.readFile('../server/data/users.json', 'utf-8', function(err, data){
        if (err) throw err;
        parse_data = JSON.parse(data);
        res.send(parse_data);
    });  
}