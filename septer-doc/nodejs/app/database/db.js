var mongos = require("mongojs");
var setting = require("./setting");
var db = mongos(setting.db.connecting,setting.db.collections);

module.exports = db;