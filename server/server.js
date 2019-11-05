const express = require('express'); //express框架模块
const path = require('path'); //系统路径模块
const fs = require('fs'); //文件模块
const url = require('url');
const hostName = '127.0.0.1'; //ip
const port = 8888; //端口

let server = express();

server.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

server.get('/pageload', function(req, res) {
    let file = path.join(__dirname, '../js/data.json'); //文件路径，__dirname为当前运行js文件的目录
    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});

server.get('/addreply', function(req, res) {
    let str = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
    let reply = {
        "username": str['username'],
        "usercontent": str['usercontent'],
        "date": str['date']
    };
    let userid = str['userid'];
    let file = path.join(__dirname, '../js/data.json'); //文件路径，__dirname为当前运行js文件的目录
    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
                    res.send('文件读取失败');
                } else {
                    data = JSON.parse(data);
                    for(let number in data){
                        if(data[number]['author']['userid']=== userid){
                            data[number]['reply'].push(reply)
                        }
                    }
                    let dataString = JSON.stringify(data);
                    fs.writeFile(file,dataString,function (err) {
                       if (err){
                           console.error(err);
                       }
                       else {
                           console.log('新增成功');
                       }
                    });
                    res.send(data);
                }
    });
});

server.get('/publish', function(req, res) {
    let str = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
    let reply = {
        "author": { "userid":str['userid'],
                    "userName":str['userName'],
                    "imgSrc":"image/head.jpeg"},
        "context": {"contenttext":str['contenttext'],
                    "date":str['date']},
        "reply":[]
    };
    let file = path.join(__dirname, '../js/data.json'); //文件路径，__dirname为当前运行js文件的目录
    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            data = JSON.parse(data);
            data.push(reply);
            let dataString = JSON.stringify(data);
            fs.writeFile(file,dataString,function (err) {
                if (err){
                    console.error(err);
                }
                else {
                    console.log('新增成功');
                }
            });
            console.log(reply);
            res.send(reply);
        }
    });
});

server.get('/deletedate', function(req, res) {
    let str = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
    let userid = str['userid'];
    let file = path.join(__dirname, '../js/data.json'); //文件路径，__dirname为当前运行js文件的目录
    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        }else {
            data = JSON.parse(data);
            for(let number in data){
                if(data[number]['author']['userid']=== userid){
                    for(let reflex in data[number]['reply']){
                        if(data[number]['reply'][reflex]['username'] === str['username'] &&
                            data[number]['reply'][reflex]['usercontent'] === str['usercontent'] &&
                                data[number]['reply'][reflex]['date'] === str['date']){
                                    delete data[number]['reply'].splice(reflex,1);
                                    break;
                        }
                    }
                }
            }
            let dataString = JSON.stringify(data);
            fs.writeFile(file,dataString,function (err) {
                if (err){
                    console.error(err);
                }
                else {
                    console.log('删除成功');
                }
            });
            res.send(data);
        }
    });
});


server.get('/delete', function(req, res) {
    let str = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
    let userid = str['userid'];
    let file = path.join(__dirname, '../js/data.json'); //文件路径，__dirname为当前运行js文件的目录
    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        }else {
            data = JSON.parse(data);
            for(let number in data){
                if(data[number]['author']['userid']=== userid){
                    delete data.splice(number,1);
                }
            }
            let dataString = JSON.stringify(data);
            fs.writeFile(file,dataString,function (err) {
                if (err){
                    console.error(err);
                }
                else {
                    console.log('删除成功');
                }
            });
            res.send(data);
        }
    });
});

server.listen(port, hostName, function() {
    console.log(`服务器运行在http://${hostName}:${port}`);
});