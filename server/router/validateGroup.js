module.exports = function(db, app){
    app.post('/validateGroup', function(req, res){
        var group = {
            'id': null,
            'name': req.body.name
        }
        if (group.name == (null || undefined)){
            res.send({"feedback": "Create a group name"})
        } else {
            db.collection('groups').find({name: group.name}).toArray().then(function(check_groups){
                if (check_groups.length == 0){
                    db.collection('groups').find({}).toArray().then(function(groups){
                        group.id = groups.length+1
                        res.send({'feeback': null, 'group': group})
                    });
                } else {
                    res.send({"feedback": "Group name is already taken"})
                }
            })
        }
    });
}
