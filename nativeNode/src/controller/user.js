const login = (username,password)=>{
    if (username === 'root' && password === 'admin'){
        return true
    }
    return false
};
module.exports = {
    login,
};