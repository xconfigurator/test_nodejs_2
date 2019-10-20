const config = require('./test_02_server.config').config
const SCRIPT = process.argv[1]

const log4js = require('log4js')
const log = log4js.getLogger(SCRIPT)
log.level = config.LOG_LEVEL

const fs = require('fs')

// 返回网页  
exports.writeHtmlToClient = function writeHtmlToClient(htmlName, res) {
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