// @author liuyang
// @since 2019/2/16
// express 使用骨架
const log4js=require('log4js')
const SCRIPT=process.argv[1]
const log=log4js.getLogger(SCRIPT)
log.level='debug'

const SERVER_PORT = 8080
const express=require('express')
const app=express()

// TODO begin
// Routers begin
app.use('/hello', require('./test_express_router_hello'))
app.use('/world', require('./test_express_router_world'))
// Routers end
app.use((req, res) => {
    res.sendStatus(404)
    res.send(404)
})
// TODO end

// Server
app.set('port', process.env.PORT || SERVER_PORT)
var server = app.listen(app.get('port'), function () {
  log.info(SCRIPT + ' is listening on server', server.address().address, ' on port ', server.address().port, ' with pid ', process.pid)
})
