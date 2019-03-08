/**
 * 演示mongoose基本使用框架
 */
let log4js = require('log4js')
const SCRIPT = process.argv[1]
let log = log4js.getLogger(SCRIPT)
log.level = 'debug'

// log.info('hello, mongoolse')

let mongoose = require('mongoose')
const URL = 'mongodb://localhost:27017/test_mongoose'
// mongoose.connect(URL) // (node:19036) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
mongoose.connect(URL, { useNewUrlParser: true })

mongoose.connection.once('open', function() {
    log.info('mongoose open')
})

mongoose.connection.once('close', function() {
    log.info('mongoose close')
})

// 一般情况下只需要链接一次，连接之后不再断开，这里只是演示一下这个方法以及验证close钩子。
// 演示触发close事件
mongoose.disconnect()
