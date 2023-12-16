<template>
  <header v-if="$route.meta.headshow">
    <!--  :style="{position:fixposition?'absolute':'fixed'}" -->
    <div
      class="header"
      :class="$route.meta | fixClass"
    >
      <van-nav-bar
        :title="title || $t($route.meta.title)"
        :class="$route.meta.titlecolor==''?'custome-white':$route.meta.titlecolor"
        :border="false"
        :fixed="false"
        @click-left="back"
      >
        <van-icon
          v-if="$route.meta.left"
          slot="left"
          name="arrow-left"
        />
        <div
          v-if="$route.meta.right"
          slot="right"
          @click="$router.push( $route.meta.right)"
        >
          <span v-if="$route.meta.right.text !== 'search'">{{ $route.meta.right.text }}</span>
          <van-icon
            v-else
            :name="$route.meta.right.text"
          />
        </div>
      </van-nav-bar>
    </div>
    <div class="placeholder" />
  </header>
</template>

<script>
export default {
  filters: {
    fixClass(meta) {
      let className = ''
      if (meta.headOpacity) {
        className += 'back-opacity '
      }
      switch (meta.color) {
        case 28:
          className += 'back-28 '
          break
        default:
      }
      switch (meta.bgColor) {
        case 26:
          className += 'back-f6 '
          break
        case 28:
          className += 'back-f8 '
          break
        case 27:
          className += 'back-f7 '
        case 29:
          className += 'back-f9 '
          break
        case 30:
          className += 'back-f10 '
        case 0:
          className += 'back-f0 '  
        default:
      }
      return className
    }
  },
  data() {
    return {
      title: null,
      color: 'red'
    }
  },
  created(){
    
  },
  updated(){
    this.$route.meta.title==""?document.title ='PRUDENTIAL':document.title = this.$t(this.$route.meta.title);
  },
  watch: {
    // 监听路由的变化
    // '$route'(to, from) {
    //   this.getTabSelect(to.name)
    // },
    '$route': {
      handler: function (to, from) {
        this.title = this.$t(to.meta.title)
      },
      deep: true
    },
  },
  methods: {
    back() {
      this.$router.goBack()
    }
  }
}
</script>

<style lang="less">

.custome-white{
  .van-nav-bar__title {
    color: #FFF;
  }
  .van-icon{
    color: #FFF;
  }
}
.custome-block{
  .van-nav-bar__title {
    color: #000;
  }
  .van-icon{
    color: #000;
  }
}


header {
  width: 100%;
  height: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  // background-color: rgba(#ffffff,0);
}
// 顶部导航
.header {
  width: 100%;
  height: 1.2rem;
  position: absolute;
  bottom: 0;
  top: constant(safe-area-inset-top);
  top: env(safe-area-inset-top);
  left: 0;
  overflow: hidden;
  //padding-top: 0.7rem;
  box-sizing: border-box;
  //background: #ffffff;
  // background: linear-gradient(-45deg, #2faaf5, #2f84e1);
  // background: -moz-linear-gradient(-45deg, #2faaf5, #2f84e1);
  // background: -o-linear-gradient(-45deg, #2faaf5, #2f84e1);
  // background: -webkit-linear-gradient(-45deg, #2faaf5, #2f84e1);
  z-index: 99;
  .van-nav-bar {
    height: 1.3rem;
    line-height: 1.3rem;
    background: none;
  }
  .van-icon {
    // color: #fff;
    font-size: 30px;
  }
  // 标题文字
  .van-nav-bar__title {
    height: 1.3rem;
    line-height: 1.3rem;
    // font-size: 0.6rem;
    font-size: 30px;
    // font-weight: bold;
    // color: #fff;
    // font-family: "hanyidasongjian";
    // font-style:italic;
    // text-shadow: -5px 2px 6px #171a39;
    // letter-spacing: 5px;
  }
  .van-nav-bar__right {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #fff;
  }
}
</style>

<style lang="less">
// 头部背景颜色透明
.back-opacity {
  background: rgba(#ffffff, 0) !important;
  .van-nav-bar {
    background: rgba(#ffffff, 0) !important;
  }
  .van-nav-bar__title,
  .van-icon {
    color: #ffffff !important;
  }
}
.back-28 {
  .van-nav-bar__title,
  .van-icon {
    color: #282828 !important;
  }
}
.back-f6{
  background: #fd8247 !important;
  .van-nav-bar {
    background: #fd8247 !important;
  }
}
.back-f8 {
  background: #fafafa !important;
  .van-nav-bar {
    background: #fafafa !important;
  }
}
.back-f7 {
  background: #f7f7f7 !important;
  .van-nav-bar {
    background: #f7f7f7 !important;
  }
}
.back-f9 {
  background: #6E1981 !important;
  .van-nav-bar {
    background: #6E1981 !important;
  }
}
.back-f10 {
  background: #FFF !important;
  .van-nav-bar {
    background: #FFF !important;
  }
}
.back-f0 {
  background: transparent !important;
  .van-nav-bar {
    background: transparent !important;
  }
}
</style>

