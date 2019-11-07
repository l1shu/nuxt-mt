export const state = () => ({
  userInfo: null
})

export const mutations = {
  saveUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}