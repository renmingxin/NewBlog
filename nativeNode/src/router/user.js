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
                return loginData.then(data=>{
                    if (data.username){
                        return new SuccessModel('登录成功');
                    }else {
                        return new ErrorModel('登录失败');
                    }
                });
                break;
            default:
                break;
        }
    }

    //登录验证的测试
    if(method === 'GET' && req.path === '/api/user/login-test'){
        console.log(req.cookie)
        if (req.cookie.username){
            return Promise.resolve(new SuccessModel('验证成功')) ;
        }
        return Promise.resolve(new ErrorModel('验证失败'));
    }
};

module.exports = handleUserRouter;