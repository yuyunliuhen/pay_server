/**
 * Created by Administrator on 2015/5/27.
 */
var redis_fat_princess_wrapper = require('./nosql/redis_fat_princess_wrapper');
var log4js = require('log4js');
var log_json = require('../config/log.json');
log4js.configure(log_json);
var http_logger = log4js.getLogger('http-logger');

exports.on_pay_result_verify = function(req,res){
    var order_info = {};
    order_info.sn = req.body['sn'];
    order_info.code = req.body['code'];
    order_info.message = req.body['message'];
    order_info.productId = req.body['productId'];
    order_info.price = req.body['price'];
    order_info.buyTime = req.body['buyTime'];
    order_info.userId = req.body['userId'];
    order_info.token = req.body['token'];
    http_logger.debug(order_info);
    redis_fat_princess_wrapper.set(req.body['sn'],order_info,function(reply){
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        var code = "200";
        res.end(JSON.stringify({"code":code,"ret":1}));
    });
};