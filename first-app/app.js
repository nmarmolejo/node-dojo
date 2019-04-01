const Logger = require('./logger')
const logger = new Logger()

logger.on('messageLogged', args => {
  console.log(`message logged: ${args}`)
})

logger.log('hello world')
