<template>
  <div id="app">
    <!--  :style="{position:fixpositiona?'absolute':'fixed'}" -->
    <div class="placeholder_top" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :style="'height:' + pageHeight" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :style="'height:' + pageHeight" />
  </div>
</template>

<script>
import versions from '@/utils/updateVer'
export default {
  name: 'App',
  data() {
    return {
      pageHeight: 0
    }
  },
  watch: {

  },
  created() {
    // 设置页面内容高度
    const pageHeight = this.$getViewportSize()

    try {
      // let barHeight = plus.navigator.getStatusbarHeight()
      // this.$store.commit('modifyBarHeight',barHeight)
      this.pageHeight = pageHeight.height + 'px'
    } catch {
      this.pageHeight = pageHeight.height + 'px'
    }

    /** 版本更新 */
    versions.get_versions(this)

    /**
     * 安卓手机物理返回键处理
     * 不需要mui.js版本 */
    const vm = this
    document.addEventListener('plusready', function () {
      var webview = plus.webview.currentWebview()
      plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
          if (e.canBack) {
            webview.back()
          } else {
            var first = null
            plus.key.addEventListener('backbutton', function () {
              // 首次按键，提示‘再按一次退出应用’
              if (!first) {
                first = new Date().getTime()
                vm.$toast({
                  message: 'Press again to exit the app',
                  position: 'bottom'
                })
                setTimeout(function () {
                  first = null
                }, 1000)
              } else {
                if (new Date().getTime() - first < 1500) {
                  plus.runtime.quit()
                }
              }
            }, false)
          }
        })
      })
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;

  .placeholder_top {
    position: fixed;
    top: 0;
    left: 0;
    width: 10rem;
    height: constant(safe-area-inset-top);
    height: env(safe-area-inset-top);
    z-index: 999;
  }
}
</style>

