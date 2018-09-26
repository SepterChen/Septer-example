var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function (req, res, next) {
  res.render('login');
})

router.post('/login',function (req, res, next) {
  res.render('chat',{userId:req.query.userId});
})

router.get('/chat',function (req, res, next) {
  res.render('chat',{userId:req.query.userId});
})
module.exports = router;
