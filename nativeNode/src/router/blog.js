const { getList } = require('../controller/blog');
const { SuccessModel,ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req,res)=>{
    const method = req.method //GET or POST


    //获取博客列表
    if (method === 'GET'){
        switch (req.path) {
            case '/api/blog/list':
                const author = req.query.author || '';
                const keyword = req.query.keyword || '';
                const listData = getList(author,keyword);
                return new SuccessModel(listData);

                break;
            case '/api/blog/detail':
                return { msg:'详情列表' };
                break;
            default:
                break;
        }
    }

    if (method === 'POST'){
        switch (req.path) {
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