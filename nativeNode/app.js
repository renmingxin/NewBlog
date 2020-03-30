const querystring  = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

//获取cookie过期时间
const getCookieExpires = ()=>{
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    return d.toGMTString();
}
//Session数据
const SESSION_DATA = {};

//用来处理post请求
const getPostData = ((req,res)=>{
    return new Promise((resolve, reject)=>{
         if (req.method !== 'POST'){
             resolve({});
             return
         }
         if (req.headers['content-type'] !== 'application/json'){
             resolve({});
             return
         }
         let postData = '';
         req.on('data',chunk=>{
             postData += chunk;
         });
        req.on('end',()=>{
            if(!postData){
                resolve({});
                return
            }
            resolve(JSON.parse(postData))
        })
    })
});

const serverHandle = (req,res)=>{
    //设置返回格式 JSON
    res.setHeader('Content-type','application/json');

    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析url里面的path
    req.query = querystring.parse(url.split('?')[1]);

    //解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';//k1=v1;k2=v2;
    cookieStr.split(';').forEach(item=>{
        if (!item){
            return
        }
        const arr = item.split("=");
        const key = arr[0].trim();
        const value = arr[1].trim();
        req.cookie[key] = value;
    });

    //解析session
    let userId = req.cookie.userid,needSetCookie = false;
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {};
        }

    }else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];




    //处理postData
    getPostData(req,res).then(postData=>{
        //把postData 放在req.body里面
        req.body = postData;

        //处理blog的路由
        const blogResult = handleBlogRouter(req,res);
        if(blogResult){
            blogResult.then(blogData=>{
                if (needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData));
            });
            return
        }

        //处理user路由
        // const userData = handleUserRouter(req,res);
        // if (userData){
        //     res.end(JSON.stringify(userData));
        //     return;
        // }
        const userData = handleUserRouter(req,res);
        if (userData){
            userData.then(userResult=>{
                if (needSetCookie){
                    //操作cookie  path=/相当于所有的网站所有的网页都生效 httpOnly只允许服务端修改
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userResult))
            });
            return;
        };
        //未找到路由 返回404
        res.writeHead(404,{'Content-type':'text/plan'});
        res.write('404 Not Found/\n');
        res.end();
    })
};

module.exports = serverHandle;