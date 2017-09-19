var express = require('express');
var router = express.Router();
var httpUtil = require('../util/HttpUtil');

router.get('/',function(req,res,next){
    httpUtil.pipe(req,res);
});

router.get('/user/info/:id',function(req,res,next){
    httpUtil.pipe(req,res);
});

router.post('/user/ssdd',function(req, res, next){
    httpUtil.pipe(req,res);
});

router.get('/upload',function(req,res,next){
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/test/uploads" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="file" multiple="multiple"><br>'+
        '<input type="file" name="file" multiple="multiple"><br>'+
        '<input type="file" name="file" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
});

router.post('/uploads',function(req,res,next){
    httpUtil.pipe(req,res);
});

module.exports = router;