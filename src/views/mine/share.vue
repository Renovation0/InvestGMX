<template>
  <div class="share-container">
    <div class="share-top"> Invite friends<br>earn commission</div>
    <div class="share-title">·Commission Details·</div>
    <div class="tcsy">
      <div class="tcsy-title">{{ $t('team.ticheng') }}</div>
      <van-row class="tcsy-row">
        <van-col class="col" span="12" offset="2">{{ $t('team.teamMemLevel') }}</van-col>
        <van-col class="col" span="10">{{ $t('team.CommRation') }}</van-col>
        <van-col class="col" span="12" offset="2">{{ $t('team.directMem') }}</van-col>
        <van-col class="col" span="10">{{ pt[0] }}</van-col>
        <van-col class="col" span="12" offset="2">{{ $t('team.secondaryMem') }}</van-col>
        <van-col class="col" span="10">{{ pt[1] }}</van-col>
        <van-col class="col" span="12" offset="2">{{ $t('team.thirdtierMem') }}</van-col>
        <van-col class="col" span="10">{{ pt[2] }}</van-col>
      </van-row>
    </div>

    <div class="tcsy">
      <div class="tcsy-title">{{ $t('team.changqi') }}</div>
      <div class="tcsy1">{{ $t('team.descriptContent') }}</div>
    </div>

    <div class="tcsy">
      <div class="tcsy-title">{{ $t('team.yaoqing') }}</div>
      <div class="tcsy1">{{ $t('team.condition1s') }}{{ pt[0] }}{{ $t('team.condition1e') }}</div>
      <div class="tcsy1">{{ $t('team.condition2s') }}{{ pt[1] }}{{ $t('team.condition2e') }}</div>
      <div class="tcsy1">{{ $t('team.condition3s') }}{{ pt[2] }}{{ $t('team.condition3e') }}</div>
      <div class="tcsy1">{{ $t('team.condition4') }}</div>
    </div>
    <div class="erweima">
      <van-row class="erweima-row">
        <van-col span="8">
          <vue-qr :logoSrc="require('../../assets/login/logo.png')" :text="shareUrl" :size="100"></vue-qr>
        </van-col>
        <van-col span="16">
          <div class="yaoqingma">{{ $t('mine.mycode') }}:{{ guid }}</div>
          <div class="erweima-btn">
            <van-button class="lo-button" round v-clipboard:copy="shareUrl" v-clipboard:success="onCopy"
              v-clipboard:error="onError">{{ $t('team.copyLink') }}</van-button>
          </div>
        </van-col>

      </van-row>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import { getTeam, getInviteInfo } from '@/api/mine'
import { Image as VanImage } from 'vant'
export default {
  components: {
    [VanImage.name]: VanImage,
    VueQr
  },
  name: 'Share',
  data() {
    return {
      guid: '',
      shareUrl: '',
      VIPList: [],
      pt: []
    }
  },
  created() {
    this.getInviteInfo()
  },
  methods: {
    onCopy(e) {
      this.$toast.success(this.$t('common.copySucess'))
    },
    onError(e) {
      this.$toast.error(this.$t('common.copyFail'))
    },
    getInviteInfo() {
      let vm = this
      getInviteInfo().then(res => {
        if (res.code == 1) {
          vm.guid = res.data.guid
          vm.shareUrl = res.data.img_url
          vm.VIPList = res.data.level_list
          vm.pt = res.data.pt
        } else {
          vm.$toast(res.msg)
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.share-container {
  height: auto;
  background: url("~assets/mine/share-bg.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 1rem;
  padding-bottom: 30px;

  .share-top {
    margin-top: 20px;
    text-align: center;
    border: 3px solid #ff8a50;
    font-size: 80px;
    font-family: zhfyh, zhfyh-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 95px;
    text-shadow: 0.77px 10.97px 65px 11px #ff320a, -9px 0px 0px 9px #f96b51;
  }

  .share-title {
    margin-top: 10px;
    background: url("~assets/mine/share-yq.png") no-repeat;
    background-size: 100% 100%;
    width: 65%;
    height: 85px;
    margin: auto;
    text-align: center;
    line-height: 85px;
    font-size: 36px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    font-weight: normal;
    color: #ffffff;
    line-height: 62px;
  }

  .tcsy {
    width: 95%;
    margin: 10px auto;
    margin-top: -500px;
    height: auto;
    background: linear-gradient(0deg, #ff8952 0%, #ff499f 100%);
    background: url("~assets/mine/share-top1.png") no-repeat;
    background-size: 100% 100%;
    height: 986px;
    border-radius: 8px;
    padding-bottom: 30px;

    .tcsy-title {
      padding-top: 520px;
      font-size: 36px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      text-align: center;
      color: #83563a;
      line-height: 39px;
    }

    .tcsy-row {
      margin-top: 20px;
      margin-left: 56px;
      font-size: 22px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #83563a;
      line-height: 33px;

      .col {
        margin-top: 20px;
      }
    }

    .tcsy1 {
      width: 80%;
      margin-top: 10px;
      margin-left: 100px;
      color: #83563a;
    }
  }

  .erweima {
    padding-top: 15px;
    width: 90%;
    margin: auto;
    background: linear-gradient(0deg, #FF379F 0%, #EFAC0A 100%);
    height: 220px;

    .erweima-row {
      text-align: center;

      .yaoqingma {
        margin: 20px;
        font-size: 33px;
        font-family: Adobe Heiti Std, Adobe Heiti Std-R;
        font-weight: normal;
        text-align: center;
        color: #FFF;
        line-height: 33px;
      }
    }

    .erweima-btn {
      .lo-button {
        background: linear-gradient(-86deg, #ff4b9c 0%, #ff8853 99%);
        color: #fff;
        width: 70%;
      }
    }
  }
}
</style>
