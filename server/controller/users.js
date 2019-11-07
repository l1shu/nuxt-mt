const Redis = require('koa-redis')
const nodeMailer = require('nodemailer')
const UserModel = require('../dbs/models/users')
const { smtp } = require('../config')

const Store = new Redis().client

async function signup (username, password, email, code) {
  if (!code) {
    return { ret: -1, msg: '验证码不能为空'}
  }

  let saveCode = await Store.hget(`nodemail:${username}`, 'code')
  let saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

  console.log(saveCode)
  console.log(saveExpire)
  
  if (saveCode === code) {
    if (new Date().getTime() - saveExpire > 0) {
      return { ret: -1, msg: '验证码已过期，请重新尝试'}
    }
  } else {
    return { ret: -1, msg: '请填写正确的验证码'}
  }

  let hasUser = await UserModel.find({ username })
  if (hasUser.length > 0) {
    return { ret: -1, msg: '用户名已被注册'}
  }

  let newUser = await UserModel.create({
    username,
    password,
    email
  })
  if (newUser) {
    return { ret: 0 }
  } else {
    return { ret: -1, msg: '注册失败'}
  }
}

async function verify (username, email) {
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    return { ret: -1, msg: '验证请求过于频繁，1分钟内1次'}
  }

  let transporter = nodeMailer.createTransport({
    host: smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: smtp.user,
      pass: smtp.pass
    }
  })
  let ko = {
    code: smtp.code(),
    expire: smtp.expire()
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail({
      from: `认证邮件<${smtp.user}>`,
      to: email,
      subject: '《慕课网高仿美团网全栈实战》注册码',
      html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
    }, (err, info) => {
      if (!err) {
        Store.hmset(`nodemail:${username}`, 'code', ko.code, 'expire', ko.expire)
        resolve()
      } else {
        reject(err)
      }
    })
  })
  return { ret: 0, msg: '验证码已发送，可能会有延时，有效期1分钟'}
}

module.exports = {
  signup,
  verify,
}