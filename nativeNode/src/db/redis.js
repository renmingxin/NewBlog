const redis = require('redis');
const  { REDIS_CONF } = require('../conf/db');

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);
redisClient.on('error',err=>{
    console.error('err');
});


function set(key,val) {
    if (typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print);

}

function get(key) {
    return new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err);
                return
            }
            if(val == null){
                resolve(null);
            }
            //如果是object 先尝试用JSON.parse返回 如果有错误 就返回原值
            try{
                resolve(JSON.parse(val))
            }catch (e) {
                resolve(val)
            }
            // //退出
            // redisClient.quit();
        });
    })
}

module.exports = {
    set,
    get
}