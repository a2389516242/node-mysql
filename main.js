var express = require('express');
var app = express();


var http = require("http")

var connDB = require("./mysqlConnect")


//配置post请求参数获取
// app.use(body.urlencoded({ extended: false }));

//设置跨域访问
app.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Credentials", "true");
    next(); // 执行下一个路由
})

app.get("/createTable", (req, res) => {
    console.log("接收到 createTable 请求！")
    let tablename = req.query.table;
    connDB.createTable("CREATE TABLE IF NOT EXISTS " + tablename + "(`runoob_id` INT UNSIGNED AUTO_INCREMENT,`runoob_title` VARCHAR(100) NOT NULL,`runoob_author` VARCHAR(40) NOT NULL,`submission_date` DATE,PRIMARY KEY(`runoob_id`))ENGINE = InnoDB DEFAULT CHARSET = utf8;")
        .then(data => {
            if (data) {
                res.send("创建表成功！")
            }
        }).catch(err => {
            res.send("创建表失败！")
        });

})

app.get("/addInfo", async (req, res) => {
    console.log("接收到 addInfo 请求！")
    let dt = req.query;
    console.log(dt);
    let affectedRows = await connDB.insert("user", dt);
    if (affectedRows) {
        res.send("添加数据成功！")
    } else {
        res.send("添加数据失败！")
    }
})

app.get("/select", (req, res) => {
    console.log("接收到 select 请求！")
    connDB.select("select * from user").then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.get("/update", (req, res) => {
    console.log("接收到 update 请求！")
    let sets = { 'usersex': 18, 'password': "aaabbb" };
    let where = { 'id': "1" }
    connDB.update("user", sets, where).then(data => {
        if (data == 1) {
            res.send("修改成功！")
        }
        else {
            res.send("修改失败！")
        }
    }).catch(err => {
        console.log(err)
    })
})

app.get("/delet", (req, res) => {
    console.log("接收到 delet 请求！")
    let where = { 'id': "4" }
    connDB.delet("user", where).then(data => {
        if (data == 1) {
            res.send("删除数据成功！")
        }
        else {
            res.send("删除数据失败！")
        }
    }).catch(err => {
        console.log(err)
    })
})

app.listen(8888, "localhost");