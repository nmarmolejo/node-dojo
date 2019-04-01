const path = require('path')
const os = require('os')
const fs = require('fs')

var pathObject = path.parse(__filename)

console.log(pathObject)

var totalMemory = os.totalmem()
var freeMemory = os.freemem()
var user = os.userInfo()

console.log('total memory: ' + totalMemory / 1024 + ' MB')
console.log('total memory: ' + freeMemory / 1024 + ' MB')
// template string
console.log(`total memory ${totalMemory / 1024} MB`)
console.log(`total memory ${freeMemory / 1024} MB`)
console.log(`user  ${user.username}`)

const files = fs.readdirSync('./')
console.log(files)

fs.readdir('C:\\', function (err, filex) {
  if (err) console.log('error', err)
  else console.log(filex)
})
