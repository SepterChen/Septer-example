var logger = require("./logs/logHelper").helper;

var setting = require("./setting.js");

// logger.err("错误");
// logger.info("信息");
// logger.warn("警告" + 'cc');
// logger.debug("测试");




//logger.err(setting.cas);



//var host = '10.0.4.36'
//var port

//logger.err(port || 80)

//logger.err(process.cwd());


// process.argv.forEach(function(val, index, array) {
//     logger.err(index + ': ' + val);
// });



// var map = new Map();

// map.set('host', '10.0.4.231');
// map.set('port', 9888);
// logger.info(map.get('host'));
// logger.info(map.get('port'));


//logger.err(process.env.PORT || 80);


// var host = 'hosts'
// var port = 'ports'


// var cas = {};

// cas.
// 'hosts' = '10.0.4.231'
// cas.
// 'ports ' = 9888


// logger.err(cas)


//logger.err(process.env.NODE_NAME);

//process.env.foo = 'bar';
// logger.err(process.env.APP_HOST);
// logger.err(process.env.APP_PORT);

// logger.err(process.env.PORT || 3005);
// logger.err(process.env.HOST || '10.0.4.36');


// set APP_HOST = '10.0.4.231'
// set APP_PORT = 9888
// set PORT = 4005

// set APP_HOST = '10.0.4.242'
// set APP_PORT = 9888
// set PORT = 3005

logger.err('host:' + setting.cas.host);
logger.err('port:' + setting.cas.port);

logger.err(process.env.PORT);
