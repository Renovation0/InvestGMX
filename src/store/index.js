'strict:true'

import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  play: true,
  routeAction: 'turn-on',
  mpType: 0, // 成功失败音乐s
  tabIndex: 0,
  showNotice:false,
  version: '1.0.0',
  new_version: '1.0.0',
  isApp: false,
  pigType:1
}

// 注册上面引用的js
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
