/*
演示回调地狱以及Promise解决方案
结论：使用Promise封装函数，配合async/await调用
参考：https://www.bilibili.com/video/av23226329/?p=16
整理：刘洋
@sine: 2019/10/21
*/
const log4js = require('log4js')
const log = log4js.getLogger(process.argv[1])
// log.level = 'debug'
log.level = 'trace'
const TIMEOUT = 1000

log.info('hello, promise')

// 非阻塞函数
function nonBlockingFunc(str, callback) {
  setTimeout(() => {
    callback(str + ' done!')
  },TIMEOUT)
}
function nonBlockingFuncPromise(str) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str + ' done!')
    },TIMEOUT)
  })
}

// 测试一下非阻塞的方法调用
/*
log.debug('before nonBlockingFnc')
nonBlockingFunc('liuyang', (str) => {
  log.info(str)
})
log.debug('after nonBlockingFunc')
*/

/////////////////////////////////////////////////////////
// 回调地狱的写法
log.warn('=============回调地狱的写法=================')
log.trace('==Before 回调地狱的写法=================')
nonBlockingFunc("hell 1", result => {
  log.info(result)
  nonBlockingFunc("hell 2", result => {
    log.info(result)
    nonBlockingFunc("hell 3", result => {
      log.info(result)
      nonBlockingFunc("hell 4", result => {
        log.info(result)
        log.trace('==After 回调地狱的写法=================')
        // Promise写法开始表演
        proceedPromise()
      })
    })
  })
})

// proceedPromise()
/////////////////////////////////////////////////////////
// Promise写法 
// 套入函数中是为了方便在前面回调函数执行完后同意执行
function proceedPromise() {
  // Promise写法
  log.warn('=============Promise的写法=================')
  log.trace('==Before Promise的写法=================')
  nonBlockingFuncPromise('p 1')
    .then((str) => {
      log.info(str) 
      return nonBlockingFuncPromise('p 2')
    })
    .then((str) => {
      log.info(str) 
      return nonBlockingFuncPromise('p 3')
    })
    .then((str) => {
      log.info(str) 
      return nonBlockingFuncPromise('p 4')
    }).then((str) => {
      log.info(str) 
      log.trace('==After Promise的写法=================')
      // 更简洁的写法
      proceedPromiseAsync()
    })
}

// proceedPromiseAsync()
// 更加简洁的写法
async function proceedPromiseAsync() {
  log.warn('=============Promise async/await 的写法============')
  log.trace('==Before Promise async/await 的写法=================')
  const str1 = await nonBlockingFuncPromise('p async 1')
  log.info(str1)
  const str2 = await nonBlockingFuncPromise('p async 2')
  log.info(str2)
  const str3 = await nonBlockingFuncPromise('p async 3')
  log.info(str3)
  const str4 = await nonBlockingFuncPromise('p async 4')
  log.info(str4)
  log.trace('==After Promise async/await 的写法=================')
}
