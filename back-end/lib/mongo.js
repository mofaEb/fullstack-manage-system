const mongoose = require('mongoose')

const url = 'mongodb://localhost/redbrick'

mongoose.connect(url)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.on('open', () => {
    console.log('we re connected')
})

module.exports = db