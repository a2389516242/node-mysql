const fs = require('fs');
const uuid = require('node-uuid');
const Mock = require('mockjs')

function mkdir(filepath) {

    fs.exists(filepath, function(exists) {
        console.log(exists)
        if (exists) {
            mkdir(__dirname + "/testDir_" + uuid.v1());
        }
        fs.mkdirSync(filepath);
        for (let i = 0; i < 200; i++) {
            let msg = Mock.Random.paragraph(100, 2000);
            fs.writeFile(filepath + "/file_" + uuid.v1() + ".txt", msg, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }

    });
}
var creatuuid = uuid.v1()
mkdir(__dirname + "/testDir_" + creatuuid);