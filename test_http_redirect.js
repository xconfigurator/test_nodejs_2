const log4js=require('log4js')
const SCRIPT=process.argv[1]
const log=log4js.getLogger(SCRIPT)
log.level = 'debug'

const http=require('http')
const HOST='localhost'
const PORT=80

http.createServer(function(request, response) {
    log.info('request come', request.url)
    
    if (request.url === '/') {
        response.writeHead(302, {
            'Location': 'http://www.baidu.com'
        })
        response.end()
    }

}).listen(PORT, HOST, function () {
    log.info('server is listening on port ' + PORT)
})