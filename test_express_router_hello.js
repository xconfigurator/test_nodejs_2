const log4js=require('log4js')
const SCRIPT=process.argv[1]
const log=log4js.getLogger(SCRIPT)
log.level='debug'

const express=require('express')

let router=express.Router()

// /hello
router.get('/', (req, res) => {
    log.info('/hello work')
    res.send('hello')
})

module.exports=router