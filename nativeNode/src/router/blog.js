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
                // return new SuccessModel(detailData);
                return detailData.then(list=>{
                    return new SuccessModel(list);
                }).catch(err=>{
                    return new ErrorModel(err)
                });
                break;
            default:
                break;
        }
    }

    if (method === 'POST') {
        switch (req.path) {
            case '/api/blog/new':
                let result = newBolg(req.body);
                return result.then(data=>{
                    return new SuccessModel(data);
                });
                break;
            case '/api/blog/update':
                let updateData = updateBolg(id,req.body);
                return updateData.then(data=>{
                    if(data){
                        return new SuccessModel('更新成功');
                    }else {
                        return new ErrorModel('更新失败')
                    }
                });
                break;
            case '/api/blog/del':
                //body里面的id
                let reqBodyId = req.body.id;
                const author ='zhangsan';//假数据 学习登录后再改为真实数据
                let delData = delBolg(id,author);
                return delData.then(data=>{
                    if(data){
                        return new SuccessModel('删除成功');
                    }else {
                        return new ErrorModel('删除失败')
                    }
                })
                break;
            default:
                break;
        }
    }
};

module.exports = handleBlogRouter;