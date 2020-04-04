const {
    getList,
    getDetail,
    newBolg,
    updateBolg,
    delBolg
} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');

//统一的登录验证函数
const loginCheck = (req)=>{
    if (!req.session.username){
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
};

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
            //新建博客
            case '/api/blog/new':
                const loginCheckResult = loginCheck(req);
                req.body.author = req.session.username;
                let result = newBolg(req.body);
                if (loginCheckResult){return loginCheck}
                return result.then(data=>{
                    return new SuccessModel(data);
                });
                break;
            //更新博客
            case '/api/blog/update':
                if (loginCheckResult){return loginCheck}
                let updateData = updateBolg(id,req.body);

                return updateData.then(data=>{
                    if(data){
                        return new SuccessModel('更新成功');
                    }else {
                        return new ErrorModel('更新失败')
                    }
                });
                break;
            //删除博客
            case '/api/blog/del':
                if (loginCheckResult){return loginCheck}
                //body里面的id
                let reqBodyId = req.body.id;
                const author = req.session.username;
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