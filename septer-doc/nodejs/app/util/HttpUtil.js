var request = require('request');
var URL = require('url');
var setting = require('../settings/settings');
var sign = require("./SignatureUtil");
/**
 * pipe通道
 * get/post通用
 */
module.exports.pipe = function(req, res){
    //加验证
    /**
     * 1.创建加密规则;
     * 2.加密方法;
     * 3.解密方法;
     */
    // if (!sign.checkSign("url","ss")) {
    //     res.send("接口验证失败");
    // }
    var url_index = req.baseUrl+req.url+'?'+URL.parse(req.url).query;
    var url = setting.server.host +　':' + setting.server.port + url_index;
    var r = request(url);
    r.on('error',function(err){
        res.send(err)
    })
    r.on('data',function(data){
        res.send(data.toString());
    })
    req.pipe(r);
}