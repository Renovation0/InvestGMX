<template>
  <footer v-if="$route.meta.tabShow">
    <!--  :style="{position:fixposition?'absolute':'fixed'}" -->
    <div class="footer">
      <van-tabbar v-model="tabSelect" :border="false" :inactive-color="inactive" :replace="true"
        :active-color="activeColor" :safe-area-inset-bottom="true" :fixed="false" @change="clickMenu">
        <van-tabbar-item class="van-tabbar-first" to="/">
          <img slot="icon" slot-scope="props" :class="props.active ? 'active' : 'normal'"
            :src="props.active ? iconhome.active : iconhome.normal">
          <span>{{ $t('foot.home') }}</span>
        </van-tabbar-item>
        <van-tabbar-item class="van-tabbar-last" to="/mOrder">
          <img slot="icon" slot-scope="props" :class="props.active ? 'active' : 'normal'"
            :src="props.active ? iconhistory.active : iconhistory.normal">
          <span>{{ $t('foot.Earnings') }}</span>
        </van-tabbar-item>
        <van-tabbar-item class="van-tabbar-center" to="/team">
          <img slot="icon" slot-scope="props" :class="props.active ? 'active' : 'normal'"
            :src="props.active ? iconteam.active : iconteam.normal">
          <span>{{ $t('foot.team') }}</span>
        </van-tabbar-item>

        <van-tabbar-item class="van-tabbar-last" to="/mine">
          <img slot="icon" slot-scope="props" :class="props.active ? 'active' : 'normal'"
            :src="props.active ? iconmy.active : iconmy.normal">
          <span>{{ $t('foot.mine') }}</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!--全局弹框-->
    <van-popup v-model:show="noticeshow" closeable>
      <div class="notice-bg">
        <div class="notice-mess">You have a system message please check</div>
        <div class="notice-check" @click="checkmessage">check</div>
      </div>
    </van-popup>
  </footer>
</template>
<script>
import { getmail } from '@/api/index'
export default {
  name: 'Footer',
  data() {
    return {
      noticeshow: false,
      inactive: '#B7B7B7',
      activeColor: '#FE9B00',
      // 选中的tabbar
      tabSelect: 0,
      /** 首页 */
      iconhome: {
        normal: require('@/assets/tab/iconhome-1.png'),
        active: require('@/assets/tab/iconhome-2.png')
      },
      /** 团队 */
      iconteam: {
        normal: require('@/assets/tab/iconteam-1.png'),
        active: require('@/assets/tab/iconteam-2.png')
      },
      /** 历史记录 */
      iconhistory: {
        normal: require('@/assets/tab/iconhistory-1.png'),
        active: require('@/assets/tab/iconhistory-2.png')
      },
      /** 我的 */
      iconmy: {
        normal: require('@/assets/tab/iconmy-1.png'),
        active: require('@/assets/tab/iconmy-2.png')
      },
    }
  },
  watch: {
    '$route': {
      handler: function (to, from) {
        this.getTabSelect(to)
      },
      deep: true
    }
  },
  updated() {
    // this.noticeshow = true
  },
  mounted() {
    // this.noticeshow = true
    const vm = this
    this.$nextTick(function () {
      vm.getTabSelect(vm.$route)
    })

    getmail().then((res) => {
      if (res.code === 1) {
        console.log(res.data)
        if(res.data==1){
          vm.noticeshow = true
        }else{
          vm.noticeshow = false
        }
      }
    });
  },
  methods: {
    checkmessage(){
      this.noticeshow = false
      this.$router.push({ path: '/mail' })
    },
    clickMenu(index) {
      const vm = this;
      vm.$store.commit("modifyTab", index);
    },
    // 其他数据
    getTabSelect(to) {
      const vm = this
      const name = to.name
      if (name === 'hIndex') {
        vm.tabSelect = 0
      } else if (name === 'mOrder') {
        vm.tabSelect = 1
      } else if (name === 'mMyTeam') {
        vm.tabSelect = 2
      } else if (name === 'mIndex') {
        vm.tabSelect = 3
      }
    }
  }
}
</script>
<style lang="less" scoped>
.notice-bg {
  background: url("~assets/tab/notice.png") no-repeat;
  background-size: 100% 100%;
  width: 632px;
  height: 652px;

  .notice-mess {
    width: 80%;
    margin: auto;
    padding-top: 320px;
    font-size: 34px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    font-weight: normal;
    text-align: left;
    color: #333333;

  }

  .notice-check {
    width: 70%;
    margin: auto;
    margin-top: 30px;
    height: 80px;
    background: #5a97ff;
    border-radius: 10px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    color: #ffffff;
  }
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  height: calc(120px + constant(safe-area-inset-bottom));
  height: calc(120px + env(safe-area-inset-bottom));
  z-index: 99;
}

.footer {
  position: absolute;
  width: 100%;
  height: 120px;
  height: calc(120px + constant(safe-area-inset-bottom));
  height: calc(120px + env(safe-area-inset-bottom));
  top: 0;
  left: 0;
  z-index: 99;
  box-sizing: border-box;

  .van-tabbar {
    height: 120px;
    line-height: 120px;
    padding: 0 62px;
    box-sizing: border-box;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    justify-content: space-between;
    background: #eee;
    // background: url("~assets/tab/foot-bg.jpg") 50% 0 no-repeat;
    // background-size: 100% 100%;
    // box-shadow: rgba(#000000, .05) 6px 0px 6px 6px;
  }

  .van-tabbar-item {
    flex: none;
  }

  .van-tabbar-item-more {
    z-index: 10000;
  }

  .van-tabbar-item__icon {
    img {
      width: auto;
      height: 40px;
      // margin-bottom: 10px;
    }
  }
}
</style>

<style lang="less">
.footer {
  .van-tabbar-item--active {
    background: none;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      background: radial-gradient(rgba(#fff, 0.4) 0%,
          rgba(255, 255, 255, 0.2) 35%,
          rgba(255, 255, 255, 0.05) 60%,
          rgba(255, 255, 255, 0) 70%);
      border-radius: 50%;
      width: 80px;
      height: 80px;
      bottom: -20px;
      left: 50%;
      z-index: 2;
      transform: translateX(-50%);
    }
  }
}
</style>
