module.exports = function(db, app, formidable){
    app.post('/imageUpload', function(req, res){
        var form = new formidable.IncomingForm({uploadDir: './userimages'});
        form.keepExtensions = true;

        form.on('error', function(err){
            if (err) throw err;
            res.send({
                result: 'failed',
                data: {},
                numberOfImages: 0,
                message: "Cannot upload image. Error " + err 
            });
        });
        form.on('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name;
        });
        form.on('file', function(field, file){
            res.send({
                result: 'Ok',
                data: {'filename': file.name, 'size': file.size},
                numberOfImages: 1,
                message: "Image uploaded successfully"
            });
        });
        form.parse(req);
    });
}