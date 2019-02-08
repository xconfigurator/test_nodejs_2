const Event = require('events').EventEmitter

let ev = new Event()

ev.on('msg', function(a, b, c) {
    console.log('a=' + a)
    console.log('b=' + b)
    console.log('c=' + c)
})

ev.emit('msg', 12, 5, 888)
