<template>
  <div class="mine-container">
    <van-row class="top-row">
      <van-col span="12" class="top-row-col1">{{ userInfo.mobile }}</van-col>
      <van-col offset="6" span="6" class="top-row-col2">VIP{{ userInfo.levels }}</van-col>
    </van-row>
    <van-row class="top2-row">
      <van-col span="12">
        <div class="top2-col">ID:{{ userInfo.guid }}</div>
        <div class="top2-col2">{{ $t('mine.code') }}:{{ userInfo.guid }} <span v-clipboard:copy="userInfo.img_url"
            v-clipboard:success="onCopy" v-clipboard:error="onError">{{ $t('team.copy') }}</span></div>
      </van-col>
      <van-col offset="6" span="6">
        <img :src="userInfo.u_img" class="vip-img">
      </van-col>
    </van-row>
    <div class="top3">
      <div class="top3-left">
        <van-row>
          <van-col span="6" style="text-align: right;">
            <img src="@/assets/mine/mine-recharge.png" class="top3-left-img">
          </van-col>
          <van-col span="10" class="top3-left-col2">
            <div class="ll">₹{{ userInfo.rechange_limit || 0 }}</div>
            <div class="rr">{{ $t('mine.curRec') }}</div>
          </van-col>

        </van-row>
      </div>
      <div class="top3-right" @click="$router.push('/mRecharge')">{{ $t('head.recharge') }}</div>
    </div>

    <div class="top4">
      <div class="top4-left">
        <van-row>
          <van-col span="6" style="text-align: right;">
            <img src="@/assets/mine/mine-withdraw.png" class="top4-left-img">
          </van-col>
          <van-col span="10" class="top4-left-col2">
            <div class="ll">₹{{ userInfo.balance || 0 }}</div>
            <div class="rr">{{ $t('mine.withdrawc') }}</div>
          </van-col>

        </van-row>
      </div>
      <div class="top4-right" @click="$router.push('/mWithdraw')">{{ $t('head.withdraw') }}</div>
    </div>
    <div class="center">
      <div class="center-title">My Profit</div>
      <div class="center-content">
        <div class="center-content1">
          <div class="content-div1">{{ $t('mine.tdsy') }}</div>
          <div class="content-div2">₹{{ userInfo.zzReward }}</div>
        </div>
        <div class="center-content2">
          <div class="content-div1">{{ $t('mine.ljtk') }}</div>
          <div class="content-div2">₹{{ userInfo.balance_total }}</div>
        </div>
      </div>
    </div>
    <div class="center2" @click="$router.push('/mvip')">
      <div class="center2-div1"> {{ $t('mine.upvipnow') }}</div>
      <div class="center2-div2">{{ $t('mine.minevip', { "level": userInfo.levels }) }}</div>
    </div>
    <div class="bottom">
      <van-row class="mine-box-row pt30">
        <van-col span="8" @click="$router.push('/team')">
          <div><img src="@/assets/mine/mine-team.png" class="mine-box-col-img" /></div>
          <div class="mine-box-col">{{ $t('foot.team') }}</div>
        </van-col>
        <van-col span="8" @click="$router.push('/mvip')">
          <div><img src="@/assets/mine/mine-vip.png" class="mine-box-col-img2" /></div>
          <div class="mine-box-col">{{ $t('team.vipLevel') }}</div>
        </van-col>
        <van-col span="8" @click="$router.push('/mEarningsRecord')">
          <div><img src="@/assets/mine/mine-buy.png" class="mine-box-col-img2" /></div>
          <div class="mine-box-col">{{ $t('mine.buyrecord') }}</div>
        </van-col>
      </van-row>
      <van-row class="mine-box-row pt30">
        <van-col span="8" @click="$router.push('/mFundingDetails')">
          <div><img src="@/assets/mine/mine-zjxq.png" class="mine-box-col-img" /></div>
          <div class="mine-box-col">{{ $t('mine.Funding_Details') }}</div>
        </van-col>
        <van-col span="8" @click="$router.push('/mOrder')">
          <div><img src="@/assets/mine/mine-syxq.png" class="mine-box-col-img2" /></div>
          <div class="mine-box-col">{{ $t('head.earRecord') }}</div>
        </van-col>
        <van-col span="8" @click="$router.push('/mBankCard')">
          <div><img src="@/assets/mine/mine-bank.png" class="mine-box-col-img2" /></div>
          <div class="mine-box-col">{{ $t('head.bankCardM') }}</div>
        </van-col>
      </van-row>
      <van-row class="mine-box-row pt30">
        <van-col span="8" @click="$router.push('/share')">
          <div><img src="@/assets/mine/mine-share.png" class="mine-box-col-img" /></div>
          <div class="mine-box-col">{{ $t('head.share') }}</div>
        </van-col>
        <van-col span="8" @click="$router.push('/mLanguage')">
          <div><img src="@/assets/mine/mine-language.png" class="mine-box-col-img2" /></div>
          <div class="mine-box-col">{{ $t('head.language') }}</div>
        </van-col>
        <van-col span="8" @click="$router.push('/downloadApp')">
          <div><img src="@/assets/mine/mine-download.png" class="mine-box-col-img2" /></div>
          <div class="mine-box-col">{{ $t('login.downLoad') }}</div>
        </van-col>
      </van-row>
      <van-row class="mine-box-row pt30">
        <van-col span="8" @click="$router.push('/hCompanyIntroduction')">
          <div><img src="@/assets/mine/mine-about.png" class="mine-box-col-img" /></div>
          <div class="mine-box-col">abouts</div>
        </van-col>
        <van-col span="8" @click="outLogin">
          <div><img src="@/assets/mine/mine-share.png" class="mine-box-col-img2" /></div>
          <div class="mine-box-col">{{ $t('mine.signOut') }}</div>
        </van-col>

      </van-row>
    </div>
  </div>
</template>

<script>
import { getMine } from '@/api/mine'
import { Image as VanImage } from 'vant'
export default {
  components: {
    [VanImage.name]: VanImage,

  },
  name: 'Team',
  data() {
    return {
      userInfo: {
        u_img: require('../../assets/mine/VIP1.png')
      },
      znx: 0
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    onCopy(e) {
      this.$toast(this.$t('common.copySucess'))
    },
    onError(e) {
      this.$toast(this.$t('common.copyFail'))
    },
    getInfo() {
      let vm = this
      getMine().then(res => {
        if (res.code == 1) {
          vm.userInfo = res.data.user
          vm.znx = res.data.user.znx
        } else {
          vm.$toast(res.msg)
        }
      })
    },
    outLogin() {
      const vm = this
      this.$dialog.confirm({
        title: vm.$t('mine.hint'),
        confirmButtonText: vm.$t('mine.conFirm'),
        cancelButtonText: vm.$t('mine.cancel'),
        message: vm.$t('mine.outTitle')
      })
        .then(() => {
          vm.$toast.loading('Aborting…')
          vm.$cookie.remove('tokenSP')
          vm.$cookie.remove('userInfoSP')
          vm.$cookie.remove('homenotice')
          setTimeout(() => {
            vm.$router.replace('/login')
            vm.$toast.clear()
          }, 1000)
        }).catch(() => { })
    },
  }
}
</script>

<style lang="less" scoped>
.mine-container {
  background: url("~assets/mine/mine-bg.png") no-repeat scroll top center #FFF5EB;
  background-size: 100%;
  min-height: 100%;
  padding-bottom: 130px;

  // padding-top: 1rem;
  .top-row {
    margin-top: 80px;
    text-align: center;

    .top-row-col1 {
      font-size: 46px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      color: #ffffff;
      line-height: 20px;
    }

    .top-row-col2 {
      width: 142px;
      height: 49px;
      opacity: 0.71;
      background: #f4f4f4;
      line-height: 49px;
      border-radius: 25px;
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: bold;
      color: #ff947c;
    }
  }

  .top2-row {
    text-align: center;

    .top2-col {
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }

    .top2-col2 {
      font-size: 30px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;

      color: #ffffff;
      line-height: 40px;

      span {
        font-size: 24px;
        text-decoration: underline;
        color: #ffffff;
      }
    }

    .vip-img {
      margin-top: 10px;
      width: 98px;
      height: 98px;
      border-radius: 50%;
    }
  }

  .top3 {
    background: url("~assets/mine/mine-top3.png") no-repeat;
    background-size: 100% 100%;
    height: 132px;
    border-radius: 40px;
    width: 95%;
    margin: auto;
    margin-top: 50px;
    display: flex;
    align-items: flex-end;
    text-align: center;

    .top3-left {
      background: url("~assets/mine/mine-top3-left.png") no-repeat;
      background-size: 100% 100%;
      width: 80%;
      height: 98px;
      margin-left: 20px;
      margin-right: 20px;
      line-height: 98px;

      .top3-left-col2 {
        text-align: left;
        margin-left: 20px;
        line-height: 40px;

        .ll {
          margin-top: 10px;
          font-size: 30px;
          font-family: Adobe Heiti Std, Adobe Heiti Std-R;
          font-weight: normal;

          color: #333333;
          letter-spacing: -0.6px;
        }

        .rr {

          font-size: 22px;
          font-weight: normal;

          color: #999999;
        }
      }

      .top3-left-img {
        margin-top: 20px;
        width: 51px;
        height: 51px;
      }
    }

    .top3-right {
      width: 176px;
      height: 66px;
      background: #87593c;
      border-radius: 33px;
      line-height: 66px;
      font-size: 26px;
      color: #ffead1;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }

  .top4 {
    background: url("~assets/mine/mine-top4.png") no-repeat;
    background-size: 100% 100%;
    height: 132px;
    border-radius: 40px;
    width: 95%;
    margin: auto;
    margin-top: 20px;
    display: flex;
    align-items: flex-end;
    text-align: center;

    .top4-left {
      background: url("~assets/mine/mine-top3-left.png") no-repeat;
      background-size: 100% 100%;
      width: 80%;
      height: 98px;
      margin-left: 20px;
      margin-right: 20px;
      line-height: 98px;

      .top4-left-col2 {
        text-align: left;
        margin-left: 20px;
        line-height: 40px;

        .ll {
          margin-top: 10px;
          font-size: 30px;
          font-family: Adobe Heiti Std, Adobe Heiti Std-R;
          font-weight: normal;

          color: #333333;
          letter-spacing: -0.6px;
        }

        .rr {

          font-size: 22px;
          font-weight: normal;

          color: #999999;
        }
      }

      .top4-left-img {
        margin-top: 20px;
        width: 51px;
        height: 51px;
      }
    }

    .top4-right {
      width: 176px;
      height: 66px;
      background: #FFF;
      border-radius: 33px;
      line-height: 66px;
      font-size: 26px;
      color: #000;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }

  .center {
    width: 95%;
    margin: 20px auto;
    height: 228px;
    background: #ffffff;
    border-radius: 10px;

    .center-title {
      padding-top: 20px;
      padding-left: 20px;
      font-size: 30px;
      color: #333333;
    }

    .center-content {
      display: flex;

      .content-div1 {
        margin-top: 10px;
        margin-left: 20px;
        font-size: 31px;
        text-align: left;
        color: #f6a582;
        line-height: 50px;
      }

      .content-div2 {
        margin-left: 20px;
        font-size: 20px;
        text-align: left;
        color: #f19066;
      }

      .center-content1 {
        margin-left: 50px;
        margin-top: 10px;
        width: 40%;
        height: 121px;
        background: #fff8e8;
        border-radius: 10px;
        // background: url("~assets/mine/center1.png") no-repeat;
        background: url("~assets/mine/center1.png") no-repeat scroll right top #fff8e8;
        //background: url("~assets/mine/center1.png") no-repeat scroll top center;
        background-size: 135px 92px;

      }

      .center-content2 {
        margin-left: 40px;
        margin-top: 10px;
        width: 40%;
        height: 121px;
        background: #e9f9ff;
        border-radius: 10px;
        background: url("~assets/mine/center2.png") no-repeat scroll right top #e9f9ff;
        background-size: 135px 92px;
      }
    }
  }

  .center2 {
    background: url("~assets/mine/mine-center2.png") no-repeat;
    background-size: 100% 100%;
    width: 95%;
    margin: auto;
    height: 182px;

    .center2-div1 {
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 110px;
    }

    .center2-div2 {
      font-size: 26px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      letter-spacing: -0.52px;
    }
  }

  .bottom {
    width: 90%;
    margin: 20px auto;
    height: 551px;
    background: #ffffff;
    border-radius: 10px;

    .mine-box-row {
      text-align: center;

      .mine-box-col-img {
        width: 46px;
        height: 42px;
      }

      .mine-box-col-img2 {
        width: 44px;
        height: 45px;
      }

      .mine-box-col {
        margin-top: 10px;
        font-size: 26px;
        color: #333333;
        letter-spacing: -0.52px;
      }
    }
  }
}
</style>