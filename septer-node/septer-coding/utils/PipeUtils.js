/**
 * pipe通道
 * get/post通用
 */

 var request = require('request')
 var URL = require('url')
 var settings = require('../settings')


 module.exports.pipe = function(req, res){
     
    var url_index = req.baseUrl + req.url + '?' +URL.parse(req.url).query
    url_index = url_index.replace('/api','')
    var url_new = settings.server.host+':'+settings.server.port + url_index
    var r = request(url)
    r.on('error',function (err) {
        res.send(err)
    }).on('data',function (data) {
        res.send(data.toString())
    })
    req.pipe(r)
 }