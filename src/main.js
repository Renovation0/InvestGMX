import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // 重置、保留浏览的样式文件，保留浏览器的一致性。
import router from './router' // 路由配置文件
import store from './store' // vuex 状态管理器
import Vant from 'vant' // vant
import 'vant/lib/index.css'
import VueQr from 'vue-qr'

import 'lib-flexible/flexible.js' // 项目在移动端的适配



// import '@/utils/swipeClick.js'
// import vueTouch from 'kim-vue-touch'
import utils from '@/utils/util.js'
import Valids from '@/utils/Verification.js'
import configs from '@/utils/config'
import vueEsign from 'vue-esign' /** 手写签名 */

import HeaderNavbar from '@/components/Header'
import Footertab from '@/components/Footer'
import Cookies from '@/utils/cookies'
import VueClipboard from 'vue-clipboard2'

import LuckDraw from 'vue-luck-draw'// 转盘
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import md5 from 'js-md5'
import AES from './utils/AES'
// 图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
/**
 * 获取屏幕宽高
 */
Vue.prototype.$getViewportSize = function() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, // 兼容性获取屏幕宽度
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight// 兼容性获取屏幕高度
  }
}
//有关i18n
const i18n = new VueI18n({
  locale: Cookies.get('languageSPG') || 'EN',//表示默认的语言 修改全局locale值可以导入message中不同的包
  messages: {
    'ZH': require('./lang/zh'), // 中文语言包
    'IN': require('./lang/in'), // 中文语言包
    'EN': require('./lang/en'), // 英文语言包
  }
})
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(Vant)
Vue.use(vueEsign)
Vue.use(LuckDraw)
// Vue.use(vueTouch)
Vue.prototype.$AES = AES
Vue.prototype.$md5 = md5
Vue.prototype.$config = configs
Vue.prototype.$valid = Valids
Vue.prototype.$util = utils
Vue.prototype.Clipboard = VueClipboard
Vue.config.productionTip = false
Vue.prototype.$cookie = Cookies
Vue.component('HeaderNav', HeaderNavbar)
Vue.component('FooterTab', Footertab)
window.vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
