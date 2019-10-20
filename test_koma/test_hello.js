const log4js = require('log4js')
const log = log4js.getLogger('test_hello.js')
log.level = 'debug'

log.info('hello, world from test.js')
