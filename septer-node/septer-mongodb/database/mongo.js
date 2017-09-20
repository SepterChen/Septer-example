var mongo = require("mongojs");
var settings = require("../settings/settings");
var db = new mongo(settings.db.mongo.dbname,settings.db.mongo.collections);

module.exports = db;