const log4js = require('log4js')
const log = log4js.getLogger('test_uuid.js')
log.level = 'debug'

const uuid = require('uuid/v4')

log.info(uuid())
log.info(uuid().replace(/\-/g, ''))
