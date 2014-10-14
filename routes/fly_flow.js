/**
 * Created by King Lee on 14-10-14.
 */
var redis_fly_flow_wrapper = require('./nosql/redis_fly_flow_wrapper');
exports.on_pay_result = function(req,res){
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
    order_info.verifystring = req.body['verifystring'];
    redis_fly_flow_wrapper.set(order_info.orderid,order_info,function(reply){
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        var code = "0";
        var tips = "接收成功";
        if(reply){
            console.log("set ok");
        }
        res.end(JSON.stringify({"code":code,"tips":tips}));
    });
};
