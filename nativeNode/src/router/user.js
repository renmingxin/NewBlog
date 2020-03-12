const {
    login,
} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handleUserRouter = (req,res)=>{
    const method = req.method //GET or POST

    //登录
    if (method === 'POST'){
        switch (req.path) {
            case '/api/user/login':
                let {username,password} = req.body;
                let loginData = login(username,password);
                if (loginData){
                    return new SuccessModel('登录成功');
                }else {
                    return new ErrorModel('登录失败');
                }
                break;
            default:
                break;
        }
    }
};

module.exports = handleUserRouter;