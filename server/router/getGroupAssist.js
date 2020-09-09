var fs = require('fs');
const { reduceEachLeadingCommentRange } = require('typescript');
module.exports = function(req,res){
    var group_assist = {
        'group_id': req.body.group_id
    }
    ga_array = []
    feedback = null
    fs.readFile('../server/data/groupAssist.json', 'utf-8', function(err, data){
        if (err) throw err;
        group_assist_data = JSON.parse(data);
        for (ga of group_assist_data){
            if (ga.group_id == group_assist.group_id){
                ga_array.push(channel);
            }
        }
        data = {"group_assist": ga_array, "feedback": feedback};
        res.send(data);
    }); 
    
}