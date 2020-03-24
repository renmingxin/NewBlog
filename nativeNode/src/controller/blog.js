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
    const sql = `select * from blogs where id='${id}'`;
    return exec(sql);
};
/**
 * @param blogData 发给服务端的新建的博客信息
 * @returns {{msg: string, id: number}}
 */
const newBolg = (blogData={})=>{
    //blogData 是一个博客对象，包含title content author属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now();
    const sql = `
        INSERT INTO blogs (title,content,createtime,author) 
        values ('${title}','${content}','${createTime}','${author}');
    `;
    return exec(sql).then(inserData=>{
        console.log(inserData);
        return {
            id:inserData.insertId
        }
    })
};

const updateBolg = (id,blogData = {})=>{
    //blogData 是一个博客对象，包含title content author属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const sql = `
        update blogs set title='${title}',content='${content}',author='${author}' 
        where id=${id};
    `;
    return exec(sql).then(updateData=>{
        console.log(updateData);
        if(updateData.affectedRows > 0){
            return true;
        };
        return false;
    })
};

const delBolg = (id,author)=>{
    const sql = `delete from blogs where id=${id} and author='${author}'`;
    return exec(sql).then(delData=>{
        console.log(delData);
        if(delData.affectedRows > 0){
            return true;
        }
        return false;
    });
}
module.exports = {
    getList,
    getDetail,
    newBolg,
    updateBolg,
    delBolg,

};