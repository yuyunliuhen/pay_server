/**
 * Created by King Lee on 14-10-14.
 */
var redis_fly_flow_wrapper = require('./nosql/redis_fly_flow_wrapper');
var NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 1024});
var log4js = require('log4js');
var log_json = require('../config/log.json');
log4js.configure(log_json);
var http_logger = log4js.getLogger('http-logger');

exports.on_pay_result = function(req,res){
    http_logger.debug(req.body);
    var order_info = {};
    order_info.florderid = req.body['florderid'];
    order_info.orderid = req.body['orderid'];
    order_info.productid = req.body['productid'];
    order_info.cardno = req.body['cardno'];
    order_info.amount = req.body['amount'];
    order_info.amountunit = req.body['amountunit'];
    order_info.ret = req.body['ret'];
    order_info.cardstatus = req.body['cardstatus'];
    order_info.merpriv = req.body['merpriv'];
    var verifystring = req.body['verifystring'];
    if(0){
        try{
            var decrypted_verifystring = key.decrypt(verifystring, 'utf8');
            http_logger.debug(decrypted_verifystring);
            var decrypted_verifystring_array = decrypted_verifystring.split('|');
            http_logger.debug(decrypted_verifystring_array);
        }
        catch (e){
            http_logger.error(e.message);
        }
    }
    redis_fly_flow_wrapper.set(order_info.orderid,order_info,function(reply){
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        var code = "0";
        var tips = "接收成功";
        if(reply){
            http_logger.debug("set ok");
        }
        res.end(JSON.stringify({"code":code,"tips":tips}));
    });
};
