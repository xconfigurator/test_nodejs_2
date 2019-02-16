const log4js = require('log4js')
const log = log4js.getLogger('test_mysql.js')
log.level = 'debug'

const mysql = require('mysql')

let db = mysql.createConnection({
    host: 'localhost',
    user: 'liuyang',
    password: '123456',
    port: '3306',
    database: 'test'
})

db.query('SELECT * FROM actor', (err, data) => {
    if (err) {
        log.error(err)
    } else {
        log.info(data)
    }
})
