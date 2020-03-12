const fs = require('fs');
const path = require('path');

//传统callback
function getFileConent(fileName,callback){
    const fullFileName = path.resolve(__dirname,'files',fileName);
    fs.readFile(fullFileName,(err,data)=>{
        if(err){
            console.error(err);
            return
        }
        callback(JSON.parse(data.toString()));
    })
}

//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//优化成promise
function getFileConent_promise(fileName){
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname,'files',fileName);
        fs.readFile(fullFileName,(err,data)=>{
            if(err){
                reject(err);
                return
            }
            resolve(JSON.parse(data.toString()));
        })
    });
    return promise;
}


//使用

// // 传统的callback方式的回调  容易出现回调地狱
// getFileConent('a.json',data=>{
//     console.log(data);
//     getFileConent(data.next,data2=>{
//         console.log(data2);
//         getFileConent(data2.next,data3=>{
//             console.log(data3)
//         })
//     })
// });

//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//优化成promise 成链式调用
getFileConent_promise('a.json').then((res,rej)=>{
    console.log(res);
    return getFileConent_promise(res.next);
}).then((res,rej)=>{
    console.log(res);
    return getFileConent_promise(res.next)
}).then((res,rej)=>{
    console.log(res);
});





