/**
 * Created by Administrator on 2015/5/27.
 */
var redis_pools = require("../nosql/redis_pools");
var h_fat_princess = 'h_fat_princess';

var redis_fat_princess_wrapper = module.exports;

redis_fat_princess_wrapper.set = function(sn,order_info,cb){
    redis_pools.execute('pool_1',function(client, release){
        client.hset(h_fat_princess,sn,JSON.stringify(order_info),function (err, reply){
            if(err){
                //  some thing log
                console.error(err);
            }
            cb(reply);
            release();
        });
    });
};

redis_fat_princess_wrapper.get = function(sn,cb){
    redis_pools.execute('pool_1',function(client, release){
        client.hget(h_fat_princess,sn,function (err, reply){
            if(err){
                //  some thing log
                console.error(err);
            }
            cb(reply);
            release();
        });
    });
};