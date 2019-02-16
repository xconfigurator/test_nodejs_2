const log4js = require('log4js')
const log = log4js.getLogger('test_socket.io.server.js')
log.level = 'debug'

const http = require('http')
const io = require('socket.io')

const SERVER_PORT = 8080
const PUSH_INTERVAL = 1000

let httpServer = http.createServer()
httpServer.listen(SERVER_PORT)

let wsServer = io.listen(httpServer)
wsServer.on('connection', socket => {
    // socket.emmit 发送
    // socket.on 接收

    setInterval(function() {
        socket.emit('t', new Date().toLocaleTimeString())
    }, PUSH_INTERVAL)
})
