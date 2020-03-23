const {
    getList,
    getDetail,
    newBolg,
    updateBolg,
    delBolg
} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const method = req.method; //GET or POST
    //url上面的id
    const id = req.query.id;


    //获取博客列表
    if (method === 'GET') {
        switch (req.path) {
            case '/api/blog/list':
                const author = req.query.author || '';
                const keyword = req.query.keyword || '';
                // const listData = getList(author, keyword);
                // return new SuccessModel(listData);
                const result = getList(author, keyword);
                return result.then(listData=>{
                    return new SuccessModel(listData);
                }).catch(err=>{
                    return new ErrorModel(err);
                });
                break;

            case '/api/blog/detail':
                const id = req.query.id || '';
                const detailData = getDetail(id);
                return new SuccessModel(detailData);
                break;

            default:
                break;
        }
    }

    if (method === 'POST') {
        switch (req.path) {
            case '/api/blog/new':
                let serverData = newBolg(req.body);
                return new SuccessModel(serverData);
                break;
            case '/api/blog/update':
                let updateData = updateBolg(id,req.body);
                return new SuccessModel(updateData);
                break;
            case '/api/blog/del':
                //body里面的id
                let reqBodyId = req.body.id;
                let delData = delBolg(id);
                return new SuccessModel(delData);
                break;
            default:
                break;
        }
    }
};

module.exports = handleBlogRouter;