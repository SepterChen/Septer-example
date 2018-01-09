var express = require('express');
var router = express.Router();
var user = require('../dao/user.js');
var mongojs = require('mongojs');
var db = mongojs('chenliangs', ['contactList']);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/contactList', function (req,res) {
	user.find({},function(result){
		res.json(result);
	});
});
router.post('/contactList', function(req,res){
	//console.log(req.body);
	user.save(req.body,function(data){
		res.json(data);
	});
	// db.contactList.insert(req.body,function (err,doc) {
	// 	// body...
	// 	res.json(doc);
	// });
});
router.delete('/contactList/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});
router.get('/contactList/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});
router.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


module.exports = router;
