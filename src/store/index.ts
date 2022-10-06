import { createStore } from 'vuex'
import stateModule from './state'
import * as mutationModule from './mutations'
import * as actionsModule from './actions'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      user: '',
      menuActive: '',
      ...stateModule
    }
  },
  mutations: {
    ...mutationModule,
    setUserActive (state: any, user) {
      console.log('更新用户数据', user)
      state.user = user
    },
    setMenuActive (state: any, current) {
      state.menuActive = current
    }
  },
  actions: {
    ...actionsModule
  }
})

export default store
