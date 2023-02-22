import storage from '../../utils/storage'

const userStore = {
  // namespaced提供名空间
  namespaced: true,
  state: () => {
    return {
      userInfo: '' || storage.getItem('userinfo')
    }
  },
  // mutations 用来修改state中的内容
  mutations: {
    saveUserInfoCommit: (state, params) => {
      storage.setItem('userinfo', params)
      state.userInfo = params
    },
    changeUserInfo: (state, params) => {
      state.userInfo = params
    }
  },
  getters: {
    getid: (state) => {
      return state.userInfo.getid
    }
  },
  // actions可以作异步处理，actions通过commit交给mutations
  actions: {
    saveUserInfoAction: (store, params) => {
      store.commit('saveUserInfoCommit', params)
    }

  }
}
export default userStore
