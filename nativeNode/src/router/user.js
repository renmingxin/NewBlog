const handleUserRouter = (req,res)=>{
    const method = req.method //GET or POST

    //登录
    if (method === 'POST'){
        switch (req.path) {
            case '/api/user/login':
                return { msg:'这是登录的接口' };
                break;
            default:
                break;
        }
    }
};

module.exports = handleUserRouter;