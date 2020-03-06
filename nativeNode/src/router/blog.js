const querystring = require('querystring');

const handleBlogRouter = (req,res)=>{
    const method = req.method //GET or POST
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);

    //获取博客列表
    if (method === 'GET'){
        switch (path) {
            case '/api/blog/list':
                return { msg:'博客列表' };
                break;
            case '/api/blog/detail':
                return { msg:'详情列表' };
                break;
            default:
                break;
        }
    }

    if (method === 'POST'){
        switch (path) {
            case '/api/blog/new':
                return { msg:'新建博客' };
                break;
            case '/api/blog/update':
                return { msg:'更新博客' };
                break;
            case '/api/blog/del':
                return { msg:'删除博客' };
                break;
            default:
                break;
        }
    }
};

module.exports = handleBlogRouter;