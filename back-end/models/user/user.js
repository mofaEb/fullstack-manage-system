const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User