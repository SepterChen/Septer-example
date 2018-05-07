var express = require('express')
var router = express.Router()
var pipeUtils = require('../utils/PipeUtils')


router.get('/api/*',function (req, res, next) {
    pipeUtils.pipe(req,res)
}).post('/api/*',function (req, res, next) {
    pipeUtils.pipe(req,res)
})

module.exports = router