var express = require('express');
var router = express.Router();
var httpUtil = require('../util/HttpUtil')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login",function(req, res, next){
	res.render('login',{"msg":""});
});

router.post("/login",function(req, res, next){

	//console.log(req.body.username+":" + req.body.password);
	var username = req.body.username;
	var password = req.body.password;

	if(username=="chenliang" && password=="123456"){  
		var user = {'username':'chenliang',"password":"123456"};
        req.session.user = user;  
        res.redirect('/');
    }  
    else  
    {  
        res.redirect('/login');  
    }  
});

router.get('/logout',function(req,res){  
    req.session.user = null;  
    res.redirect('/login');  
});  

router.get('/*',function(req,res,next){
    //console.log('ccc');
    httpUtil.pipe(req,res);
});

module.exports = router;
