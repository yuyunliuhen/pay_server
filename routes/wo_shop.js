/**
 * Created by King Lee on 15-1-29.
 */
var log4js = require('log4js');
var log_json = require('../config/log.json');
log4js.configure(log_json);
var http_logger = log4js.getLogger('http-logger');
//var json_wo_pay = require('../config/wo_pay');

var parsePost = function(req,res,cb){
    var chunks = [];
    req.on('data', function(chunk) {
        chunks.push(chunk);
    });

    req.on('end', function() {
        //  convert array to string,delimiter is "";
        var data = chunks.join('');
        //  convert url format to normal!!
        cb(qs.parse(data));
    });
    req.on('error',function(err){
        http_logger.debug('problem with request: ' + err.message);
    });
};

exports.on_pay_result = function(req,res){
    parsePost(req,res,function(data){
        http_logger.debug(data);
    });
    /*
    var serviceid = req.body['serviceid'];
    for(var v in json_wo_pay){
        if(serviceid = json_wo_pay[v].serviceid){

        }
    }
    */
    res.end(JSON.stringify({"code":200}));
};
