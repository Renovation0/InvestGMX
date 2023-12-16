<template>
  <div id="Layout" class="layout">
    <!-- <back-music /> -->
    <header-nav />
    <!-- <transition :name="transitionName"> -->
      <keep-alive v-if="$route.meta.keep">
        <router-view />
      </keep-alive>
    <!-- </transition> -->
    <!-- <transition v-if="!($route.meta.keep)" :name="transitionName"> -->
      <router-view class="child-view" />
    <!-- </transition> -->
    <footer-tab />
  </div>
</template>

<script>
export default {
    name: 'Layout',
    data() {
        return {
          // 切换页面渐入效果
          transitionName: 'slide-right',
        }
    },
    // 切换页面渐入效果
    // beforeRouteUpdate (to, from, next) {
    //   let isBack = this.$router.isBack
    //   if (isBack) {
    //     this.transitionName = 'slide-right'
    //   } else {
    //     this.transitionName = 'slide-left'
    //   }
    //   // this.$router.isBack = false
    //   next()
    // }
}
</script>

<style lang="less">
  // 切换页面渐入效果
  .child-view {
    position: absolute;
    width:100%;
    transition: all .8s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
  .turn-on-enter {
    transform: translate3d(100%, 0, 0);
  }
  .turn-on-leave-to {
    // transform: translate3d(-20%, 0, 0);
  }
  .turn-on-enter-active,
  .turn-on-leave-active {
    transition: transform 0.4s ease;
  }
  .turn-off-enter {
    // transform: translate3d(-20%, 0, 0);
  }
  .turn-off-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .turn-off-enter-active,
  .turn-off-leave-active {
    transition: transform 0.4s ease;
  }
  .turn-off-leave-active {
    z-index: 2;
  }
</style>

