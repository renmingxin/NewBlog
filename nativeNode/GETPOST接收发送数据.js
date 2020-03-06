const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);

    //设置返回格式为JSON
    res.setHeader('Content-type','application/json');

    //返回的数据
    const resData = {
        method,
        url,
        path,
        query,
    };

    //返回数据
    if (method === 'GET'){
        res.end(JSON.stringify(resData))
    }
    if (method === 'POST'){
        let postData = '';
        req.on('data',chunk => {
            postData +=chunk.toString()
        });
        req.on('end',()=>{
            resData.postData = postData;
            res.end(JSON.stringify(resData))
        })
    }
});


//POST 使用postman软件模拟客户端向localhost:3000服务器发送post请求
// const server = http.createServer((req,res)=>{
//     if (req.method === 'POST'){
//         let headers_contentType = req.headers['content-type'];
//         console.log(headers_contentType);
//         //接收数据
//         let postData = '';
//         req.on('data',chunk => {
//             //chunk本身是二进制的格式 需要tostring
//             postData += chunk.toString();
//         });
//         //结束
//         req.on('end',()=>{
//             res.end('接收完毕');
//         })
//     }
// });

server.listen(3000,()=>{
    console.log(`server已启动3000端口`);
});