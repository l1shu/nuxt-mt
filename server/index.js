const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const session = require('koa-generic-session')
const Redis = require('koa-redis')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const mongoose = require('mongoose')
const passport = require('./utils/passport')

// 引入路由
const users = require('./routes/users')
const geo = require('./routes/geo')
const search = require('./routes/search')

const app = new Koa()

app.keys = ['mt', 'l1shu']
app.proxy = true // 干嘛用的？
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))

app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

// 数据库连接
mongoose.connect(require('./config').dbs, {
  useNewUrlParser: true, // 底层MongoDB驱动程序已弃用其当前的连接字符串解析器。添加了useNewUrlParser标志，以允许用户在新解析器中发现错误时退回到旧解析器。
  useUnifiedTopology: true // 使用新的Server Discover and Monitoring engine
})
mongoose.connection.on("error", (error) => {
  console.log("数据库连接失败：" + error)
})
mongoose.connection.on("open", () => {
  console.log("数据库连接成功！")
})

// passport
app.use(passport.initialize()) // 简单为当前ctx添加passport字段，便于后面的使用
app.use(passport.session()) // passport自带的策略，用于从session中提取用户信息

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // routes
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
