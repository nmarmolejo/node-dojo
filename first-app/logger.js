const EventEmitter = require('events')

class Logger extends EventEmitter {
  log (message) {
    console.log(message)

    this.emit('messageLogged', message)
  }
}

// module.exports.log = log
// module.exports = { log, sum, url }
module.exports = Logger
