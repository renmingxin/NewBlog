const { exec } = require('../db/mysql');

const getList = (author, keyWord)=>{
    let sql = `select * from blogs where 1=1 `;
    if(author){
        sql += `and author='${author}' `;
    }
    if(keyWord){
        sql += `and title like '%${keyWord}%' `;
    }
    sql += ` order by createtime desc`;
    //返回一个promise
    return exec(sql);
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