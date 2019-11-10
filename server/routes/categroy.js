const Router = require('koa-router')
const axios = require('axios')
const { SuccessModel, ErrorModel } = require('../utils/resModel')

let router = new Router({
  prefix: '/categroy'
})

router.get('/crumbs', async (ctx) => {

  let { status, data: { areas, types } } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params:{
      city: ctx.query.city.replace('市','') || "北京"
    }
  })
  ctx.body = new SuccessModel({
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : [],
  })
})

module.exports = router