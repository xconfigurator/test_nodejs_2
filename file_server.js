/**
 * 提示：看这段代码的时候需要结合P16视频中的分析
 */
const log4js = require('log4js')
const log = log4js.getLogger('file_server.js')
log.level = 'trace'

const http = require('http')
const common = require('./libs/common') // 自定义的一些通用函数

const fs = require('fs')

function processData(data, req, res) {
    // 解析二进制文件上传数据
    let post = {}
    let files = {}
    // 0. 要获取分隔符
    if (req.headers['content-type']) { // 如果是上传文件
        let str = req.headers['content-type'].split('; ')[1]
        if (str) {
            // log.info(str)
            let boundary = '--' + str.split('=')[1] 
            log.debug('boundary = ' + boundary)
            
            // 1. 用分隔符来切分整个数据
            let arr = data.split(boundary) // data是一个buffer，其中的split方法是在libs/common.js中定义
            log.debug(arr)

            // 2. 丢弃头尾两个数据
            arr.shift()
            arr.pop()

            // 3. 丢弃掉每个数据头尾的“\r\n”
            arr = arr.map(buffer => buffer.slice(2, buffer.length - 2))
            log.debug(arr)
            log.debug(arr.map(buffer => buffer.toString()))

            // 4. 每个数据在第一个连续的“\r\n\r\n”处切成两半，一半是数据的描述，另一半是数据的值
            arr.forEach(buffer => {
                let n = buffer.indexOf('\r\n\r\n')
                let disposition = buffer.slice(0, n)
                let content = buffer.slice(n + '\r\n\r\n'.length)
                log.debug(disposition.toString(), ' | ' ,content.toString())
                log.debug('-------------------')

                if (disposition.indexOf('\r\n') == -1) {
                    // 普通数据
                    /*
                    Content-Disposition: form-data; name="user"  |  hei
                     */
                    log.trace('普通数据')
                    content = content.toString()
                    let name = disposition.split('; ')[1].split('=')[1] + ''
                    log.trace('name = ' + name)
                    name = name.substring(1, name.length - 1)
                    post[name] = content // key:value
                } else {
                    // 文件数据
                    /*
                    Content-Disposition: form-data; name="f1"; filename="201901251622_给同学们的.txt"
                    Content-Type: text/plain
                    */
                    log.trace('文件数据')
                    let [line1, line2] = disposition.split('\r\n')
                    let [, name, filename] = line1.split('; ') // 解构赋值
                    let type = line2.split(': ')[1]
                    
                    name = name.split('=')[1] + ''
                    name = name.substring(1, name.length - 1)

                    filename = filename.split('=')[1] + ''
                    filename = filename.substring(1, filename.length - 1)

                    log.trace(name, filename, type)
                    log.trace(name.toString(), filename.toString(), type.toString())
                    log.trace(content)
                    log.trace(content.toString())

                    // fs.writeFile('' + )
                    // TODO p15 17:01
                }
            })
        }
    }
}

// 演示文件上传
let server = http.createServer((req, res) => {
    let arr = []
    
    req.on('data', data=>{
        log.trace('data')
        arr.push(data)
    })

    req.on('end', () => {
        let data = Buffer.concat(arr)
        log.trace(data)

        // 处理上传数据
        processData(data, req, res)

        // 注意位置！
        res.end()
    })

})

server.listen(8080, function () {
    log.info('file_server.js listening on address ', server.address().address, ' on port ', server.address().port, ' with pid ', process.pid)
  })
