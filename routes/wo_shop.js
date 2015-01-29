/**
 * Created by King Lee on 15-1-29.
 */
var log4js = require('log4js');
var log_json = require('../config/log.json');
log4js.configure(log_json);
var http_logger = log4js.getLogger('http-logger');
var json_wo_pay = require('../config/wo_pay');

exports.on_pay_result = function(req,res){
    var serviceid = req.body['serviceid'];
    for(var v in json_wo_pay){
        if(serviceid = json_wo_pay[v].serviceid){

        }
    }
    http_logger.debug(JSON.stringify(req));
    res.end(JSON.stringify({"code":200}));
};
