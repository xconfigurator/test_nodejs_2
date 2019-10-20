const config = require('./test_02_server.config').config
const SCRIPT = process.argv[1]

const log4js = require('log4js')
const log = log4js.getLogger(SCRIPT)
log.level = config.LOG_LEVEL

const http = require('http')
// const fs = require('fs')

const handler = require('./test_02_server.handler') 

http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')

  // 处理请求
  log.info('url = ' + req.url)
  switch(req.url) {
    case '/':
      res.end('hello, world')
      break
    case '/about':
      res.end('ABOUT: liuyang test intro')
      break
    case '/home':
      res.end('HOME: Welcome!')
      break
    case '/html':
      // writeHtmlToClient('test_02_server.html.html', res)
      handler.writeHtmlToClient('test_02_server.html.html', res)
      break
    case '/html2':
      handler.writeHtmlToClient('test_02_server.html.2.html', res)
      break
    default:
      res.end('DEFAULT')
  }

}).listen(config.PORT, config.IP, () => {
  log.info('server is listening on port ' + config.PORT)
})

/*
// 返回网页  
function writeHtmlToClient(htmlName, res) {
  fs.readFile(__dirname + '/' + htmlName, 'UTF-8', (err, data) => {
    if (err) {
      log.error(err)
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 404
      res.end('Not Founed.')
    } else {
      log.info(data)
      res.setHeader('Content-Type', 'text/html')
      res.statusCode = 200
      res.end(data)
    }

  })
}
*/