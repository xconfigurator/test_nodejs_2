const log4js = require('log4js')
const log = log4js.getLogger('test_crypto.js')
log.level = 'debug'

const crypto = require('crypto')

const STR = 'hello, world'

// md5
let str = crypto.createHash('md5').update(STR).digest('hex')
log.info(str)
