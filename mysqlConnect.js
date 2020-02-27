var mysql = require("mysql");
var connDB = {};
var pool = mysql.createPool({
    host: '192.168.88.119',
    user: 'root',
    password: 'root',
    database: 'fptext',
});
// var connection = mysql.createConnection({
//     host: "192.168.88.119",
//     user: "root",
//     password: "root",
//     database: "fptext"
// });
// connection.connect((err) => {
//     if (err) throw err;
//     console.log("数据库链接成功！");
// });

// connection.on('error', ()=>{
//     console.log('connection on error : mysql error')
// })

connDB.createTable = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, (err, res) => {
                    if (err) {
                        console.log("用户创建表时失败:" + err)
                        reject(err)
                    } else {
                        console.log(res)
                        resolve(res)
                    }
                    connection.release();
                })
            }
        });

    })

};

// 插入一条数据
connDB.insert = async function insertData(table, datas) {
    var fields = '';
    var values = '';
    for (var k in datas) {
        fields += k + ',';
        values = values + "'" + datas[k] + "',"
    }
    fields = fields.slice(0, -1);
    values = values.slice(0, -1);
    var sql = "INSERT INTO " + table + '(' + fields + ') VALUES(' + values + ')';
    try {
        let data = await new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    connection.query(sql, (e, r) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve(r)
                        }
                        connection.release();
                    })
                }
            });
        })
        return data.affectedRows
    } catch (e) {
        console.log('inline error')
    }
};

//查询数据
connDB.select = (sql) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, (err, res) => {
                    if (err) {
                        console.log("查询数据时失败:" + err)
                        reject(err);
                    } else {
                        var string = JSON.stringify(res);
                        console.log("查询数据时成功:" + string)
                        resolve(string)
                    }
                    connection.release();
                })
            }
        });
    });
}

// 更新一条数据
connDB.update = (table, sets, where) => {
    var _SETS = '';
    var _WHERE = '';
    var keys = '';
    var values = '';
    for (var k in sets) {
        _SETS += k + "='" + sets[k] + "',";
    }
    _SETS = _SETS.slice(0, -1);
    for (var k2 in where) {
        //  _WHERE+=k2+"='"+where[k2]+"' AND ";
        _WHERE += k2 + "=" + where[k2];
    }
    // UPDATE user SET Password='321' WHERE UserId=12
    //update table set username='admin2',age='55'   where id="5";
    var sql = "UPDATE " + table + ' SET ' + _SETS + ' WHERE ' + _WHERE;
    console.log(sql);
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, (err) => {
                    if (err) {
                        console.log("修改数据时失败:" + err)
                        reject(err);
                    } else {
                        console.log("修改数据时成功!")
                        resolve(1)
                    }
                    connection.release();
                })
            }
        })
    });
}

// 删除一条数据
connDB.delet = (table, where) => {
    var _WHERE = '';
    for (var k2 in where) {
        //多个筛选条件使用  _WHERE+=k2+"='"+where[k2]+"' AND ";
        _WHERE += k2 + "=" + where[k2];
    }
    // DELETE  FROM user WHERE UserId=12  注意UserId的数据类型要和数据库一致
    var sql = "DELETE FROM " + table + ' WHERE ' + _WHERE;
    console.log(sql);
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, (err) => {
                    if (err) {
                        console.log("删除数据时失败:" + err)
                        reject(err);
                    } else {
                        console.log("删除数据时成功!")
                        resolve(1)
                    }
                    connection.release();
                })
            }
        })
    });
}

//test promise
// async function getName() {
//     let promise = new Promise((resolve, reject)=>{
//         db.query('select * from user', (err, res)=>{
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(res)
//             }
//         })
//     })

//     try {
//         let data = await promise
//         console.log(data)
//     } catch(e) {
//         console.log(e)
//     }
// }

// getName()

module.exports = connDB;