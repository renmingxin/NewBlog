const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'})
    res.end('<h1>11111111</h1>')
});

server.listen(3000,()=>{
    console.log(`server已启动3000端口`)
})