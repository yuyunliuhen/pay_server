/**
 * Created by King Lee on 14-10-21.
 */
var redis_fly_flow_wrapper = require('./nosql/redis_fly_flow_wrapper');
var log4js = require('log4js');
var log_json = require('../config/log.json');
log4js.configure(log_json);
var http_logger = log4js.getLogger('http-logger');

exports.on_pay_result_verify = function(req,res){
    var orderid = req.body['orderid'];
    redis_fly_flow_wrapper.get(orderid,function(reply){
        var order_info = JSON.parse(reply);
        http_logger.debug(order_info);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        var code = "200";
        res.end(JSON.stringify({"code":code,"ret":order_info?order_info.ret:0,"amount":order_info?order_info.amount:0}));
    });
};
