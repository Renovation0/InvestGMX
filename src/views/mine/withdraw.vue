<template>
  <div class="withdraw">
    <div class="line"></div>
    <div class="recharge-top">
      <div class="top-title">{{ $t('mine.wdhyye') }}</div>
      <div class="top-money">₹{{ balance || 0 }}</div>
    </div>
    <div class="recharge-money">
      <div class="title">{{ $t('mine.selectCardTitle') }}</div>
      <div class="rechargelist">
        <!-- <div class="paymentlist"> {{ $t('mine.payment') }}</div> -->
        <van-radio-group v-model="radio">
          <van-cell-group inset>
            <van-cell v-for="(item, index) in bankList" :key="index + 'bank'" icon="pending-payment" :title="item.name"
              clickable @click="radio = item.id">
              <template #right-icon>
                <van-radio :name="item.id" checked-color="#87593c"></van-radio>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="money-input">
        <van-field class="recharge-input" v-model="number" type="number" :label="$t('mine.withdrawc')"
          :placeholder="limit">
        </van-field>
      </div>
    </div>
    <div class="recharge-btn">
      <div class="recharge-btn-img" @click="subWithdraw">OK</div>
    </div>
    <div class="shuoming">
      <div class="title">{{ $t('mine.withdrawrules') }}</div>
      <div class="content">{{ $t('mine.withCondition1') }}</div>
      <div class="content">{{ $t('mine.withCondition2') }}</div>
      <div class="content">{{ $t('mine.withCondition3') }}</div>
      <div class="content">{{ $t('mine.withCondition4') }}</div>
    </div>
    <!--验证码弹框-->
    <van-popup v-model="showyzm" round>
      <div class="popup-yzm">
        <div class="title"> Withdrawal OTP certification</div>
        <div class="popup-tel"> {{ account }}</div>
        <div class="yzm-content">
          <van-field v-model="code" name="code" :placeholder="$t('login.pcaptcha')" type="digit" maxlength='20'>
            <template #button>
              <div v-if="time == ''" class="getcaptcha" @click="sendSMS">Get OTP</div>
              <div v-else class="getcaptcha">{{ time }}s</div>
            </template>
          </van-field>
        </div>
        <div class="yzm-button" @click="subWithdraw2">
          {{ $t('mine.conFirm') }}
        </div>
      </div>
      <div class="popup-close mt10"><img src="@/assets/home/popup-close.png" class="popup-close-img"
          @click="closePop" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";
import { getWithdrawInfo, putWithdraw } from '@/api/mine'
import { userCodeRegister } from '@/api/login'
import { Image as VanImage } from 'vant'
export default {
  components: {
    [VanImage.name]: VanImage,
    swiper,
    swiperSlide
  },
  name: 'WorkspaceJsonRecharge',
  data(vm) {
    return {
      radio: -1,
      account: '',
      code: '',//验证码
      time: '',//发送验证码倒计时
      setInt: null,
      showyzm: false,
      bankIndex: 0,
      swiperOption: {
        effect: 'coverflow',
        centeredSlides: true,
        initialSlide: 0, // 默认显示下标，自行设置
        spaceBetween: '6%',
        slidesPerView: 'auto',
        loop: false,
        // autoplay: true, // 是否自动播放
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
        on: {
          slideChange() {
            vm.bankIndex = this.activeIndex
          }
        }
      },
      balance: 0,
      number: '',
      showBank: false,

      bankList: [],
      limit: 'minimum |200 '
    }
  },
  watch: {
    // 监听输入数量 只允许输入小数点后两位
    number(value) {
      console.log(value)
      if (value > parseFloat(this.balance)) {
        this.number = String(this.balance)
      } else {
        const index = value.indexOf('.')
        if (index !== -1) {
          if (value.substring(index + 1).length > 2) {
            value = value.substring(0, value.length - 1)
            this.number = parseFloat(value).toFixed(2)
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  created() {
    let userinfo = JSON.parse(this.$AES.decrypt(this.$cookie.get('userInfoSP')))
    this.avatar = userinfo.u_img
    this.account = userinfo.tel;
    this.getInfo()
  },
  methods: {
    subWithdraw2() {
      let vm = this
      if (vm.code == '' || vm.number == 0) {
        vm.$toast('Please enter the code')
      }

      if (vm.number == '' || vm.number == 0) {
        vm.$toast(vm.$t('common.numWithdrawalToast'))
      } else {
        putWithdraw({ num: vm.number, id: vm.bankList[vm.bankIndex].id, code: vm.code, phone: this.account }).then(res => {
          if (res.code == 1) {
            vm.$toast(res.msg)
            vm.number = ''
            vm.getInfo()

            vm.code = ''
            vm.showyzm = false
            vm.time = ''
            clearInterval(vm.setInt)
            vm.setInt = null
          } else {
            vm.$toast(res.msg)
          }
        })
      }
    },
    closePop() {
      this.showyzm = false
    },
    sendSMS() {
      let vm = this
      if (vm.account == '') {
        vm.$toast(vm.$t('login.phoneToast'))
      } else {
        vm.$toast.loading({ duration: 0, message: vm.$t('login.sendProgress') + '…' })
        userCodeRegister({ phone: vm.account }).then(res => {
          if (res.code == 1) {
            vm.$toast(vm.$t('login.sendSuccess'))
            vm.time = 60
            vm.setInt = setInterval(() => {
              if (vm.time > 0) {
                vm.time--
              } else {
                vm.time = ''
                clearInterval(vm.setInt)
                vm.setInt = null
              }
            }, 1000)
          } else {
            vm.$toast(res.msg)
          }
        })
      }
    },
    changeBank(item, index) {
      this.bankIndex = index
      this.showBank = false
    },
    showChangeBank() {
      this.showBank = true
    },
    getInfo() {
      let vm = this
      getWithdrawInfo().then(res => {
        if (res.code == 1) {
          vm.balance = res.balance
          let bankList = res.bank_list
          if (bankList.length > 0) {
            vm.bankList = bankList
          }
        } else {
          vm.$toast(res.msg)
        }
      })
    },
    changeAll() {
      if (this.balance <= 0) {
        vm.$toast(vm.$t('mine.balancenot'))
        return false
      }
      this.number = this.balance
    },
    subWithdraw() {
      let vm = this
      if (vm.number == '' || vm.number == 0) {
        vm.$toast(vm.$t('common.numWithdrawalToast'))
        return false
      }
      this.showyzm = true
      // if (vm.number == '' || vm.number == 0) {
      //   vm.$toast(vm.$t('common.numWithdrawalToast'))
      // } else {
      //   putWithdraw({ num: vm.number, id: vm.bankList[vm.bankIndex].id }).then(res => {
      //     if (res.code == 1) {
      //       vm.$toast(res.msg)
      //       vm.number = ''
      //       vm.getInfo()
      //     } else {
      //       vm.$toast(res.msg)
      //     }
      //   })
      // }
    },
  }
}
</script>

<style lang="less" scoped>
.withdraw {
  background: url("~assets/mine/recharge-bg.png") no-repeat scroll top center #F4F4F4;
  background-size: 100% 384px;
  min-height: 100%;

  .line {
    height: 140px;
  }

  .recharge-top {
    width: 90%;
    margin: auto;

    background: url("~assets/mine/recharge-top.png") no-repeat;
    background-size: 100% 100%;
    height: 343px;

    .top-title {
      padding-top: 130px;
      margin-left: 50px;
      font-size: 24px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      color: #a36e2a;
      line-height: 44px;
    }

    .top-money {
      width: 257px;
      height: 77px;
      margin: auto;
      background: #fce6c6;
      border-radius: 50px;
      text-align: center;
      font-size: 41px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: justifyLeft;
      color: #a36e2a;
      line-height: 77px;
    }
  }

  .recharge-money {
    background-color: #FFF;
    width: 90%;
    margin: 20px auto;
    border-radius: 10px;
    padding: 20px 0px;

    .title {
      text-align: center;
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: bold;
      color: #87593c;
      line-height: 33px;
    }

    .recharge-row {
      text-align: center;
      margin-top: 30px;

      .moneylist {
        width: 189px;
        height: 88px;
        background: #FFF;
        border: 3px solid #c0a069;
        border-radius: 10px;
        box-shadow: -9px 0px 28px 9px rgba(195, 163, 109, 0.23);
        line-height: 88px;

        font-size: 30px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;

        color: #333333;

      }
    }

    .money-input {
      width: 90%;
      margin: auto;
      margin-top: 20px;
      border: #a36e2a 2px solid;
      border-radius: 20px;
    }

    .rechargelist {
      width: 90%;
      margin: auto;
      opacity: 0.5;
      background: #ffffff;
      border-radius: 21px;

      .paymentlist {
        margin-left: 20px;
        padding-top: 10px;
        font-size: 28px;
        font-family: PingFang, PingFang-SC-Medium;
        font-weight: normal;
        color: #87593c;
        line-height: 50px;
      }
    }
  }

  .recharge-btn {
    width: 90%;
    margin: auto;
    height: 86px;
    background: linear-gradient(270deg, #cb8954 0%, #f1c096 100%);
    border-radius: 43px;
    text-align: center;
    line-height: 86px;
    color: #ffffff;
    font-size: 36px;
  }

  .shuoming {
    width: 90%;
    margin: 30px auto;
    min-height: 315px;
    opacity: 0.5;
    background: #ffffff;
    border-radius: 21px;

    .title {
      padding-top: 40px;
      text-align: center;
      font-size: 36px;
      color: #111111;
    }

    .content {
      width: 90%;
      margin: 10px auto;
      font-size: 26px;

      line-height: 35px;
    }
  }

  .popup-yzm {
    width: 471px;
    height: 460px;
    background: #ffffff;
    border-radius: 30px;

    .title {
      color: #ffc21f;
      font-size: 30px;
      height: 111px;
      background: #D6212E;
      font-size: 31px;
      text-align: center;
      color: #ffffff;
      line-height: 111px;
    }

    .popup-tel {
      width: 80%;
      height: 77px;
      border: 2px solid #cccccc;
      margin: 20px auto;
      border-radius: 17px;
      font-size: 37px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #cccccc;
      line-height: 77px;
    }
    .yzm-content{
      width: 80%;
      margin:20px auto;
    }
    .yzm-button {
      
      width: 50%;
      margin: 10px auto;
      margin-top: 50px;
      font-size: 35px;
      text-align: center;
      color: #FFF;
      line-height: 33px;
      padding: 20px 30px;
      background: #D6212E;
      border-radius: 33px;
    }
  }

  .popup-close {
    text-align: center;

    .popup-close-img {
      width: 57px;
      height: 59px;
    }
  }
}
</style> 
<style lang="less">
.withdraw {
  .van-cell {
    background-color: transparent;
    color: #87593c;
    border: #CCCCCC 1px solid;
    border-radius: 17px;
  }
  .van-popup{
    background-color: transparent;
  }
}
</style> 