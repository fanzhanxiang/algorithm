const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    const  urlObj = url.parse(req.url, true)
    const  pathname = urlObj["pathname"]
    const  query = urlObj["query"]
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.setHeader("X-Powered-By",' 3.2.1')
    res.setHeader("Content-Type", "text/html")
    
    // 下面做请求路径的判断
    let Data = JSON.parse(fs.readFileSync('../data/zhihu.txt'))
    let userData = Data.user
    let answerData = Data.answer
    if(pathname === '/user') {
        res.end(JSON.stringify({
            "code": 0,
            "msg": "success",
            "data": userData
        }));
        return;
    }
    if(pathname === '/answer') {
        res.end(JSON.stringify({
            "code": 0,
            "msg": "success",
            "data": answerData
        }));
        return;
    }
    let raceDataHot = JSON.parse(fs.readFileSync('../data/zhihu3.txt'))
    let raceDataList = JSON.parse(fs.readFileSync('../data/zhihu2.txt'))
    if(pathname === '/raceHot') {
        res.end(JSON.stringify({
            "code": 0,
            "msg": "success",
            "data": raceDataHot
        }));
        return;
    }
    if(pathname === '/raceList') {
        res.end(JSON.stringify({
            "code": 0,
            "msg": "success",
            "data": raceDataList
        }));
        return;
    }
})

server.listen(8081,function() {
    console.log('node启动成功～')
})

