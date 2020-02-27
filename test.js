// async function forOfAwait(list) {
//     for await (let item of list) {
//         setTimeout(() => { console.log(item) }, 3000);
//     }
//     return 2;
// }
var list = [{ name: "joel", age: "22" }, { name: "憨憨", age: "24" }]
    // let res = forOfAwait(list);
    // console.log(res);

async function print(item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("姓名: " + item.name + "年龄: " + item.age);
        }, 3000);
    })
}

async function main() {
    for (let i = 0; i < list.length; i++) {
        let a = await print(list[i]);
        console.log(a)
            // for (let j = 0; j < 5; j++) {
            //     console.log(await print("内部" + j))
            // }
    }
}

// main()

// var funcs = []
// let i;
// for (var i = 0; i < 10; i++) {
//     funcs.push(function() { console.log(i) })
// }
// funcs.forEach(function(func) {
//     func()
// })


setTimeout(function() {
    console.log(1)
}, 0);
new Promise(function executor(resolve) {
    console.log(2);
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve();
    }
    console.log(3);
}).then(function() {
    console.log(4);
});
console.log(5);