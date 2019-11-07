export const actions = {
  async nuxtServerInit ({ commit }, { req, $axios, store }) {
    console.log('nuxtServerInit')
    
    let ctx = req.ctx
    let user = ctx.session.passport && ctx.session.passport.user
    if (user) {
      commit('user/saveUserInfo', user)
    }
    try {
      let [positionRes, menuRes] = await Promise.all([
        $axios.get('http://cp-tools.cn/geo/getPosition'),
        $axios.get('http://cp-tools.cn/geo/menu'),
      ])
      commit('geo/savePosition', {
        city: positionRes.status == 200 ? positionRes.data.city : '',
        province: positionRes.status == 200 ? positionRes.data.province : ''
      })
      commit('home/saveMenu', menuRes.status == 200 ? menuRes.data.menu : [])

      // 这个依赖geo.position.city不能放到Promise.all中
      let { status, data: { result } } = await $axios.get('http://cp-tools.cn/search/hotPlace', { params: { city: store.state.geo.position.city.replace('市', '') } })
      commit('home/saveHotPlace', status == 200 ? result : [])
    } catch (error) {}

  }
}