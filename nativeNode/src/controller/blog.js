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
const getDetail = (id)=>{
    return {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime:1583488144296,
        author:'zhangsan'
    }
}
/**
 *
 * @param blogData 发给服务端的新建的博客信息
 * @returns {{msg: string, id: number}}
 */
const newBolg = (blogData={})=>{

    console.log(blogData);
    //blogData 是一个博客对象，包含title content属性
    return {
        id:11,
        msg:'新建成功'
    }
}

const updateBolg = (id,blogData = {})=>{
    return {
        id:id,
        msg:'修改成功'
    }
}

const delBolg = (id)=>{
    console.log(id)
    return {
        id:id,
        msg:'删除成功'
    }
}
module.exports = {
    getList,
    getDetail,
    newBolg,
    updateBolg,
    delBolg,

};