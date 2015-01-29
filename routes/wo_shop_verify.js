/**
 * Created by King Lee on 15-1-29.
 */
var log4js = require('log4js');
var log_json = require('../config/log.json');
log4js.configure(log_json);
var http_logger = log4js.getLogger('http-logger');

exports.on_pay_result_verify = function(req,res){
    http_logger.debug(JSON.stringify(req));
    res.end(JSON.stringify({"code":200}));
};
