const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
    const authorization = ctx.get('Authorization')
    if (authorization === '') {
        ctx.throw(401, 'no token detected in http headerAuthorization')
    }
    const token = authorization.split('')[1]

    try {
        await jwt.verify(token, 'cedric1990')
    } catch (err) {
        ctx.throw(401, 'invalid token')
    }

    await next()
}