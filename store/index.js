export const state = () => ({
  user: null
})

export const mutations = {
  saveUser (state, user) {
    state.user = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let ctx = req.ctx
    let user = ctx.session.passport && ctx.session.passport.user
    if (user) {
      commit('saveUser', user)
    }
  }
}