/**
 * Created by King Lee on 14-10-14.
 */
var redis_fly_flow_wrapper = require('./nosql/redis_fly_flow_wrapper');
var NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 1024});

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
    var verifystring = req.body['verifystring'];
    try{
        var decrypted_verifystring = key.decrypt(verifystring, 'utf8');
        console.log(decrypted_verifystring);
        var decrypted_verifystring_array = decrypted_verifystring.split('|');
        console.log(decrypted_verifystring_array);
    }
    catch (e){
        console.log(e.message);
    }
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
