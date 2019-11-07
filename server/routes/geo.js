const Router = require('koa-router')
const axios = require('axios')
const { SuccessModel, ErrorModel } = require('../utils/resModel')

let router = new Router({
  prefix: '/geo'
})

const sign = '123'// 接口暂时不需要签名认证

router.get('/getPosition', async (ctx) => {
  let { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  ctx.body = new SuccessModel({
    province: status === 200 ? province : '',
    city: status === 200 ? city : ''
  })
})

router.get('/province', async (ctx) => {
  let { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = new SuccessModel({
    province: status === 200 ? province : []
  })
})

router.get('/province/:id', async (ctx) => {
  let { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  ctx.body = new SuccessModel({
    city: status === 200 ? city : []
  })
})

router.get('/city', async (ctx) => {
  let { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  ctx.body = new SuccessModel({
    city: status === 200 ? city : []
  })
})

router.get('/hotCity', async (ctx) => {
  let { status, data: { hots } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  ctx.body = new SuccessModel({
    hots: status === 200 ? hots : []
  })
})

router.get('/menu', async (ctx) => {
  let { status, data: { menu } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  ctx.body = new SuccessModel({
    menu: status === 200 ? menu : []
  })
})

module.exports = router