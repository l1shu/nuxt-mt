const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../dbs/models/users')

// 注册策略，使用LocalStrategy的local策略，在使用 passport.authenticate('local', ...) 的时候，会执行策略
passport.use(new LocalStrategy(async (username, password, done) => {
  let user = await UserModel.findOne({ username })
  if (!user) {
    return done(null, false, '用户不存在')
  }

  if (user.password === password) {
    return done(null, user)
  } else {
    return done(null, false, '密码错误')
  }
}))

// 序列化,在调用 ctx.login() 时会触发序列化操作。
passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user.username)
  done(null, user)
})

// 反序列化，随后得请求时，session中存在"passport":{"user":"xxx"}触发
passport.deserializeUser((user, done) => {
  console.log('deserializeUser: ', user.username)
  done(null, user)
})

module.exports = passport