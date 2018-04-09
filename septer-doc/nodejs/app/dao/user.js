var db = require("../database/db.js");

module.exports.save = function(user,callback){
	db.contactList.save(user,function(err,result){
		if (err || !result) {
			console.log("保存失败");
		}else{
			console.log("Save Success!");
			callback(result);　　
		}
	});
}


module.exports.find = function(condition,callback){
	db.contactList.find(condition,function(err,result){
		if (err || !result) {
			console.log(err);
		}else{
			console.log(result);
			callback(result);
			
			// result.forEach(function(femaleUser) {　　
			// 	console.log(femaleUser);　　
			// });
		}
	});
}

