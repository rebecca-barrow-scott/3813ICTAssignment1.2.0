var fs = require('fs');
module.exports = function(req,res){
    nothing = null
    fs.writeFile('E:\\2020\\Trimester 2\\3813ICT Software Frameworks\\Assignment1.2\\chattyapp\\server\\data\\users.json', nothing, 'utf-8', function(err){
        if (err) throw err;
    });
    res.send();
}