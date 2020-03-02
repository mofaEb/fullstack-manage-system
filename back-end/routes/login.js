const express = require('express')
const router = express.Router()
const User= require('../controller/user/user')

router.post('/', User.login)

module.exports = router