class BaseModel {
    constructor(data,message){
        //如果传的data是字符串类型 就把data赋值给this.message
        if(typeof data === 'string'){
            this.message = data;
            data = null;
            message = null;
        }
        if (data){
            this.data = data;
        }
        if (message){
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};