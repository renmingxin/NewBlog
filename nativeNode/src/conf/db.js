const env = process.env.NODE_ENV;//环境变量
//配置
let MYSQL_CONF;
//区分测试环境和生成环境的配置
if (env === 'dev'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'admin123',
        port:'3306',
        database:'myblog'
    }
}
if(env === 'production'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'admin123',
        port:'3306',
        database:'myblog'
    }
}

if(env === undefined){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'admin123',
        port:'3306',
        database:'myblog'
    }
}
module.exports = {
    MYSQL_CONF
};