export const state = () => ({
  position: null
})

export const mutations = {
  savePosition (state, position) {
    state.position = position
  }
}