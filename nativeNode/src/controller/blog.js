const getList = (author, keyWord)=>{
    // 先返回假数据(格式是正确的)
    return[
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:1583488144296,
            author:'zhangsan'
        },
        {
            id:2,
            title:'标题B',
            content:'内容B',
            createTime:1583488144296,
            author:'lisi'
        },
        {
            id:3,
            title:'标题C',
            content:'内容c',
            createTime:1583488144296,
            author:'lisiC'
        },
    ]
};
module.exports = {
    getList
};