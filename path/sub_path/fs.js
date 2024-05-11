const fs = require('fs')

const test = require('./path.js')
console.log(test)

fs.readFile('./path.js', (err, data) => {})
