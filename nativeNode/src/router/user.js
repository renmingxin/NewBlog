const querystring = require('querystring');

const handleUserRouter = (req,res)=>{
    const method = req.method //GET or POST
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);

    //登录
    if (method === 'POST'){
        switch (path) {
            case '/api/user/login':
                return { msg:'这是登录的接口' };
                break;
            default:
                break;
        }
    }
};

module.exports = handleUserRouter;