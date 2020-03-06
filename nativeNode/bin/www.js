const http = require('http');
const serverHadnle = require('../app');


const server = http.createServer(serverHadnle);
const port = 3000;

server.listen(port,()=>{
    console.log('启动成功3000端口')
});