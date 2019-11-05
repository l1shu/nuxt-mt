const Router = require('koa-router')

const router = new Router({
  prefix: '/city'
})

router.get('/list', async (ctx) => {
  ctx.body = ['GZ', 'SZ']
})

module.exports = router
