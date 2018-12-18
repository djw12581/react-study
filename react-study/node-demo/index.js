var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// 用来使后端得到ajax传来的数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })); //解析post请求数据

app.use(express.static('static'))
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

var sendHtml = function (path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function (err, data) {
        console.log(`读取的html文件 ${path} 内容是`, data, typeof (data))
        response.header('Access-Control-Allow-Origin', "http://localhost:3000")
        response.send(data)
    })
}

// 数据库操作对象
let operate = require('./model/operate.js');

// 测试 api
app.get('/', function (request, response) {
    var path = 'index.html'
    sendHtml(path, response)
})
// show users
app.get('/api/show/users', function (request, response) {
    var path = 'users.json'
    sendHtml(path, response)
})
// add user
app.post('/api/add/user', function (request, response) {
    var path = 'users.json'
    // 拿到数据
    var data = request.body
    console.log('拿到数据', data, typeof (data), data.userName)
    // 写入文件
    var fs = require('fs')
    // var s = JSON.stringify(data)
    var content = fs.readFileSync(path, 'utf8')
    var users = JSON.parse(content)

    // 将数据添加到json中
    users.push(data)
    // writeToFile(path, data)
    console.log('read users', users)
    var s = JSON.stringify(users)
    fs.writeFile(path, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('保存成功')
        }
    })
})

// show essays
app.get('/api/show/essays', function (request, response) {
    operate.find().then(d => {
        console.log('detail', d)
        return response.send(d)
    })
})
// add essays
app.post('/api/add/essays', function (request, response) {
    var i = Math.floor(Math.random()*500)
    var data = request.body
    data.iconSave = '0'
    data.iconClick = '0'
    data.iconClickLock = false
    data.iconSaveLock = false
    data.iconCommit = '0'
    data.imgSrcRight = `https://picsum.photos/300/200/?image=${i}`
    console.log('拿到的数据：', data)
    operate.save(data).then(d => {
        return response.send(d)
    })
})
app.post('/api/update/essays/iconText', function (request, response) {
    var data = request.body
    // 通过 data.type 判断
    switch (data.type) {
        case "star-o":
            // 点击的是 iconSave 
            var d = data._id + ""
            // console.log('id',data, d)
            var mongoose = require('mongoose');
            var id = mongoose.Types.ObjectId(d)
            var s = data.text
            operate.update({ _id: id }, { iconSave: s }).then(d => {
                // console.log('1 为匹配到, save iconSave', d)
            })
            // iconSaveLock
            var l = data.lock
            operate.update({ _id: id }, { iconSaveLock: l }).then(d => {
                // console.log('1 为匹配到 save lock', d)
            })
            break;
        case "like-o":
            // 点击的是 iconClick 
            var d = data._id + ""
            // console.log('id-d', data, d)
            var mongoose = require('mongoose');
            var id = mongoose.Types.ObjectId(d)
            var s = data.text
            operate.update({ _id: id }, { iconClick: s }).then(d => {
                // console.log('1 为匹配到, save iconClick', d)
            })
            // iconClickLock
            var l = data.lock
            operate.update({ _id: id }, { iconClickLock: l }).then(d => {
                // console.log('1 为匹配到 save lock', d)
            })
            break;
    }
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})


// fetch('http://localhost:8081/api/add/essays', {
//           method: 'POST',
//           mode: "cors",
//           headers: {
//             'Accept': 'aplication/json', 
//             'Content-Type': 'application/json'
//           }
//         }).then(res => {
//           return res.text()
//         }).then(res => {
//           console.log('add essays', res, typeof(res))
//         })

// var values = {
//     href: "/",
//     title: "标题",
//     description: "描述信息",
//     content: "文字内容内容文字内容",
//     imgSrcRight: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
// }
// var data = JSON.stringify(values)
// console.log('提交的数据为: ', values, 'data:', data, typeof (data));
// // fetch post
// fetch('http://localhost:8081/api/add/essays', {
//     method: 'POST',
//     mode: "cors",
//     headers: {
//         'Accept': 'aplication/json',
//         'Content-Type': 'application/json'
//     },
//     body: data,
// }).then(res => {
//     return res.text()
// }).then(res => {
//     console.log('save ok ')
// }) 