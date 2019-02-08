const log4js = require('log4js')
const log = log4js.getLogger('test_buffer_split.js')
log.level = 'info'

// log.info('hey')

let str = 'abccc-=-dddder-=-qwerqwer'
// let b = Buffer.alloc(str.length, str) // Buffer的推荐用法 
let b = new Buffer(str)
log.info(b)
log.info(b.toString())

// 给Buffer一个split方法
// 你不可能等十年，那样你自己就先饿死了，故，权宜之计
// 等有官方实现了就使用官方实现
Buffer.prototype.split = Buffer.prototype.split || function (b) {
    let arr = []
    let cur = 0 // 记录本次查找的起始索引
    let n = 0   // 保存找到下一个b的起始位置
    while ((n = this.indexOf(b, cur)) != -1) {
        arr.push(this.slice(cur, n))
        cur = n + b.length
    }
    // 最后一个b的后面的部分
    arr.push(this.slice(cur))

    return arr
}


// 测试
let arr = b.split('-=-')
log.info(arr)
log.info(arr.map(buffer => buffer.toString()))
