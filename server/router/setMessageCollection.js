module.exports = function(db, app){
    app.get('/setMessageCollection', function(req, res){
        var messages = [{"channel_id":1, "user": "Super", "msg":"Hey Rebecca", "img": "dots2.png", "attachment": null},
                        {"channel_id":1, "user": "Rebecca", "msg":"Hey Super", "img": "dots2.png", "attachment": "dots2.png"}]
        
        db.collection('messages').deleteMany({}, function(err, result){
            if (err) throw err;
            db.collection('messages').insertMany(messages, function(err, result){
                if (err) throw err;
                res.send({"feedback": null});
            });
        });
       
    });
}