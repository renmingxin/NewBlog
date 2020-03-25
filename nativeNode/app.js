const querystring  = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

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
        const key = arr[0];
        const value = arr[1];
        req.cookie[key] = value;
    });
    console.log(req.cookie)

    //处理postData
    getPostData(req,res).then(postData=>{
        req.body = postData;

        //处理blog的路由
        const blogResult = handleBlogRouter(req,res);
        if(blogResult){
            blogResult.then(blogData=>{
                res.end(JSON.stringify(blogData));
            })
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
                res.end(
                    JSON.stringify(userResult)
                )
            })
            return;
        };
        //未找到路由 返回404
        res.writeHead(404,{'Content-type':'text/plan'});
        res.write('404 Not Found/\n');
        res.end();
    })
};

module.exports = serverHandle;