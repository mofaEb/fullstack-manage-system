const express = require('express')
const path = require('path')
const routes = require('./routes')
const mongo = require('./lib/mongo')

const app = express()

app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

routes(app)

app.listen(3000, ()=> {
    console.log(`listening on port 3000`)
})