const Router = require('koa-router')
const axios = require('axios')
const { SuccessModel, ErrorModel } = require('../utils/resModel')

let router = new Router({
  prefix: '/search'
})

router.get('/top', async (ctx) => {
  let { input, city } = ctx.query

  let { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: { // 这里之所以用parmas而不是拼在url后面是因为前者会自动encodeURIComponent
      input,
      city
    }
  })
  ctx.body = new SuccessModel({
    top: status === 200 ? top : []
  })
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  console.log(city)

  let { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: { city }
  })
  ctx.body = new SuccessModel({
    result: status === 200 ? result : []
  })
})

router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query

  let { status, data: { count, pois } } = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`, {
    params: { city, keyword }
  })
  ctx.body = new SuccessModel({
    count: status === 200 ? count : [],
    pois: status === 200 ? pois : []
  })
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let { status, data: { product, more } } = await axios.get(`http://cp-tools.cn/search/products`, {
    params: { city, keyword }
  })
  
  ctx.body = {
    product: status === 200 ? product : [],
    more: ctx.isAuthenticated() ? more: [],
    login: ctx.isAuthenticated()
  }
})

module.exports = router
