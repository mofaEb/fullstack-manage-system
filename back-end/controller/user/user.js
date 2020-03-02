const UserModel = require("../../models/user/user")
const formidable = require('formidable')
const createToken = require('../../token/createToken')
const checkToken = require('../../token/checkToken')


class User {
    constructor () {}

    async signup (req, res, next) {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
            const {username, password} = fields
			try {
                const user = await UserModel.findOne({username});
                if (!user) {
                    const newUser = {
                        username, password,
                        token: createToken(username)
                    }
                    console.log('go')
                    const createUser = new UserModel(newUser)   
                    const userinfo = await createUser.save()
                    res.send(userinfo)
                } else {
                    res.send({
                        status: 0,
                        message: '用户名已存在'
                    })
                }
            }catch (err) {
                console.log(err)
            }
        })
    } 

    async login (req, res, next) {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
            const {username, password} = fields
            
            let doc = await UserModel.findOne({ username })
            if (!doc) {
                res.send({
                    code: -1,
                    msg: '用户名不存在'
                })
            } else if (doc.password !== password) {
                res.send({
                    code: -1,
                    msg: '密码错误'
                })
            } else if (doc.password === password) {
                console.log('密码正确')
                let token = createToken(username) // 生成token 
                doc.token = token // 更新mongo中对应用户名的token
                try {
                    await doc.save()
                    res.send({
                        code: 0,
                        msg: '登录成功',
                        username,
                        token
                    })
                } catch (err) {
                    res.send({
                        code: 1,
                        msg: '登录失败，请重新登录',
                    })
                }
            }
        })
    }
}

module.exports = new User()