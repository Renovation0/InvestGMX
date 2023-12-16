<template>
  <div class="download">
    <!-- <div class="title">海量优质资源</div>
    <div class="content">海量优质资源</div> -->
    <div class="center">
      <img src="@/assets/login/download-center.png" class="download-center" />
    </div>
    <div class="wenzi2" @click="weixinBtn1"><img src="@/assets/login/Android.png" class="wenzi2l">
      <span>{{ $t('login.downloadAn') }}</span>
    </div>
    <div class="mt20"></div>
    <div class="wenzi2" @click="weixinBtn2" v-if="info.iosurl != ''"><img src="@/assets/login/iphone.png"
        class="wenzi2l"> <span>{{ $t('login.downloadIos') }}</span></div>
    <!-- 微信提示页面 -->
    <div v-if="is_wei_xin" class="weixin-hint">
      <img src="@/assets/login/wexintishi.png" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
import { addressDownload } from '@/api/login'
export default {
  name: 'Download',
  data() {
    return {
      is_wei_xin: false,
      info: {
        apkurl: '123123',
        iosurl: '1231'
      }
    }
  },
  created() {
    addressDownload().then(res => {
      if (res.code === 1) {
        this.info = res.data
      }
    })
  },
  methods: {
    weixinBtn1() {
      if (this.isWeiXin()) {
        this.is_wei_xin = true
      } else {
        this.is_wei_xin = false
        window.open(this.info.apkurl)
      }
    },
    weixinBtn2() {
      if (this.isWeiXin()) {
        this.is_wei_xin = true
      } else {
        this.is_wei_xin = false
        window.open(this.info.iosurl)
      }
    },

    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.download {

  height: 100%;
  background: url("~assets/login/download-bg.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 2rem;

  .title {
    padding-top: 1.2rem;
    font-size: 64px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 36px;
  }

  .content {
    padding-top: 30px;
    font-size: 31px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 36px;
  }

  .center {
    width: 60%;
    margin: auto;
    height: 800px;

    .download-center {
      width: 100%;
      margin: auto;
      height: 100%;
    }
  }

  .wenzi2 {
    margin-top: 30px;
    display: flex;
    background: transparent;
    border-radius: 49px;
    width: 60%;
    margin: auto;
    border: 1.39px solid #5e89ef;
    border-radius: 40px;
    background-color: #fff;
    .wenzi2l {
      padding-left: 30px;
      width: 45px;
      height: 55px;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      vertical-align: middle;

    }

    span {
      padding-left: 30px;
      font-size: 30px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      text-align: center;
      color: #ff947c;
      line-height: 100px;
    }
  }

  .weixin-hint {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    z-index: 1;
  }
}
</style>
