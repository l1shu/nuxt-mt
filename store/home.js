export const state = () => ({
  menu: [],
  hotPlace: []
})

export const mutations = {
  saveMenu(state, menu) {
    state.menu = menu
  },
  saveHotPlace(state, hotPlace) {
    state.hotPlace = hotPlace
  }
}