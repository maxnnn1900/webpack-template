export default {
  state: {
    message: 'hello from vuex'
  },
  mutations: {},
  actions: {},
  getters: {
    getMessage (state) {
      return state.message
    }
  }
}