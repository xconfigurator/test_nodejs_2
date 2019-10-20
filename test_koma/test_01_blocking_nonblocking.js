// @since 2019/10/21
const log4js = require('log4js')
const log = log4js.getLogger('test_01_blocking.js')
log.level = 'debug'

log.info('test_01_blocking.js')

const TIMEOUT = 3000

////////////////////////////////////////////////////////////
// 阻塞处理
log.info('Blocking begin')
function doSomething() {
  var start = new Date().getTime()
  while (new Date().getTime() < start + TIMEOUT) {}
}
function funcBlockingDemo() {
  // doSomething是阻塞的
  doSomething()
  log.error('Blocking done!')
}
funcBlockingDemo()
log.info('Blocking end')

////////////////////////////////////////////////////////////
// 非阻塞
log.debug('NonBlocking begin')
function funcNonBlockingDemo() {
  // setTimeout是非阻塞的
  setTimeout(()=>{
    // 回调
    log.error('NonBlocking done!')
  }, TIMEOUT)
}
funcNonBlockingDemo()
log.debug('NonBlocking end')


////////////////////////////////////////////////////////////
// 等一会再退出，否则看不到非阻塞输出
/*
for (let i = 0; i < 4; i++) {
  doSomething()
}
log.warn('test_01_blocking_nonblocking.js exit')
*/