const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

// console.log(MYSQL_CONF)
//创建链接对象
const con = mysql.createConnection(MYSQL_CONF);

//开始连接
con.connect();

//统一执行sql语句

// const sql = 'INSERT INTO blogs (title,content,createtime,author) values (\'标题C\',\'内容\',1584965413582,\'wangwu\');';
function exec(sql){
    const promise = new Promise((resolve, reject) =>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err);
                return
            }
            resolve(result)
        });
    });
    return promise;
}
// con.end();
module.exports = {
    exec
};
