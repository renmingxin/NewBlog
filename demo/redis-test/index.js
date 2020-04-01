const redis = require('redis');

//创建客户端
const redisClient = redis.createClient(6379,'127.0.0.1');
redisClient.on('error',err=>{
    console.error('err');
});

//测试  第三个函数打印出来是否正确
redisClient.set('name','rmx',redis.print);
redisClient.get('aaa',(err,val)=>{
    if(err){
        console.error(err);
        return
    }
    console.log('val: ',val);

    //退出
    redisClient.quit();
});