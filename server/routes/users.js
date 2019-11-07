const Router = require('koa-router')
const passport = require('../utils/passport')
const { signup, verify } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../utils/resModel')

let router = new Router({
  prefix: '/users'
})

router.post('/signup', async (ctx, next) => {
  let { username, password, email, code } = ctx.request.body
  try {
    let res = await signup(username, password, email, code)
    if (res.ret == 0) {
      ctx.body = new SuccessModel(res.msg)
    } else {
      ctx.body = new ErrorModel(res.msg)
    }
  } catch (error) {
    console.log(error)
    ctx.body = new ErrorModel(error)
  }
})

router.post('/signin', async (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = new ErrorModel(err)
      return
    }
    if (user) {
      ctx.body = new SuccessModel(user, '登录成功')
      ctx.login(user)
    } else {
      ctx.body = new ErrorModel(info)
    }
  })(ctx, next)
})

// 发送验证码获取code
router.post('/verify', async (ctx, next) => {
  let { username, email } = ctx.request.body
  try {
    let res = await verify(username, email)
    if (res.ret == 0) {
      ctx.body = new SuccessModel(res.msg)
    } else {
      ctx.body = new ErrorModel(res.msg)
    }
  } catch (error) {
    console.log(error)
    ctx.body = new ErrorModel(error)
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel()
  }
})

router.get('/getUser', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    let { username, email } = ctx.session.passport.user
    ctx.body = new SuccessModel({
      username,
      email
    })
  } else {
    ctx.body = new ErrorModel('用户未登录')
  }
})

module.exports = router
