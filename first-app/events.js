const EventEmitter = require('events')

const emitter = new EventEmitter()

// Register a listener
emitter.on('messageLogged', function () {
  console.log('new message loggeed')
})

emitter.addListener('messageLogged', function () {
  console.log('listener called')
})

emitter.on('event1', function (arg) {
  console.log(arg.id)
  console.log(arg.url)
  console.log('arg', arg)
})

emitter.on('event1', (arg) => {
  console.log('arrow function', arg)
})

// Raise an event
emitter.emit('messageLogged')
emitter.emit('event1', { id: 1, url: 'http://google.com' })
