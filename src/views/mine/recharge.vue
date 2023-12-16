<template>
  <div class="recharge">
    <div class="backg">
      <div class="line"></div>
      <div class="recharge-top">
        <div class="top-title">{{ $t('mine.wdhyye') }}</div>
        <div class="top-money">₹{{ balance || 0 }}</div>
      </div>

      <div class="recharge-money">
        <div class="title">{{ $t('mine.rechargecount') }}</div>
        <van-row class="recharge-row">
          <van-col span="1"></van-col>
          <van-col span="7">
            <div @click="changemoney($event)" class="moneylist" data-money='300'>₹300.00</div>
          </van-col>
          <van-col span="7">
            <div class="moneylist" @click="changemoney($event)" data-money='500'>₹500.00</div>
          </van-col>
          <van-col span="7">
            <div class="moneylist" @click="changemoney($event)" data-money='2000'>₹2000.00</div>
          </van-col>
          <van-col span="2"></van-col>
        </van-row>
        <van-row class="recharge-row">
          <van-col span="1"></van-col>
          <van-col span="7">
            <div @click="changemoney($event)" class="moneylist" data-money='5000'>₹5000.00</div>
          </van-col>
          <van-col span="7">
            <div class="moneylist" @click="changemoney($event)" data-money='10000'>₹10000.00</div>
          </van-col>
          <van-col span="8">
            <div class="moneylist" @click="changemoney($event)" data-money='20000'>₹20000.00</div>
          </van-col>
          <van-col span="2"></van-col>
        </van-row>

        <div class="money-input">
          <van-field class="recharge-input" v-model="number" type="number" label="Recharge" :placeholder="limit">
          </van-field>
        </div>

        <div class="rechargelist">
          <div class="paymentlist"> {{ $t('mine.payment') }}</div>
          <van-radio-group v-model="radio">
            <van-cell-group inset>
              <van-cell v-for="(item, index) in payType" :key="index + 'type'" icon="pending-payment" :title="item.name"
                clickable @click="radio = item.id">
                <template #right-icon>
                  <van-radio :name="item.id" checked-color="#87593c"></van-radio>
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
      <div class="recharge-btn">
        <!-- <img src="@/assets/mine/new/recharge-btn.png" class="recharge-btn-img" /> -->
        <div class="recharge-btn-img" @click="putRecharge">OK</div>
      </div>

      <div class="shuoming">
        <div class="title">{{ $t('mine.rechargeRules') }}</div>
        <div class="content">{{ $t('mine.rechargeRules1') }}</div>
        <div class="content">{{ $t('mine.rechargeRules2') }}</div>
        <div class="content">{{ $t('mine.rechargeRules3') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRechargeInfo, putRecharge } from '@/api/mine'
import { Image as VanImage } from 'vant'
export default {
  components: {
    [VanImage.name]: VanImage,

  },
  name: 'WorkspaceJsonRecharge',
  data() {
    return {
      avatar: '',
      number: '',
      radio: -1,
      balance: 0,
      payType: [],
      limit: ''
    }
  },
  created() {
    //vm.$AES.encrypt(JSON.stringify(res.data)
    let userinfo = JSON.parse(this.$AES.decrypt(this.$cookie.get('userInfoSP')))
    this.avatar = userinfo.u_img
    this.getInfo()
  },
  methods: {
    changemoney(e) {
      this.number = e.target.dataset.money
    },
    getInfo() {
      let vm = this
      getRechargeInfo().then(res => {
        if (res.code == 1) {
          vm.payType = res.data
          if (vm.payType.length > 0) {
            vm.radio = vm.payType[0].id
          }
          vm.balance = res.rechange
          vm.limit = vm.$t('mine.plarecharge') + res.limit
        }
      })
    },
    putRecharge() {

      let vm = this
      if (vm.number == '' || vm.number == 0) {
        vm.$toast(vm.$t('common.numRechargeToast'))
      } else {
        let isChange = false
        let current = null
        vm.payType.forEach(item => {
          if (item.id == vm.radio) {
            current = item
            isChange = true
          }
        })
        if (current.recharge_min != 0) {
          if (vm.number < current.recharge_min) {
            vm.$toast(vm.$t('common.rechargeMin'))
            return false;
          }
        }
        if (current.recharge_max != 0) {
          if (vm.number > current.recharge_max) {
            vm.$toast(vm.$t('common.rechargeMax'))
            return false;
          }
        }

        if (isChange) {
          vm.$toast.loading({
            duration: 0,
            forbidClick: true,
          })
          putRecharge({ num: vm.number, id: vm.radio }).then(res => {
            if (res.code == 1) {
              vm.$toast.clear()
              let u = navigator.userAgent
              let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1
              let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
              if (isIOS) {
                window.location.href = res.data.paymentUrl
              } else {
                window.open(res.data.paymentUrl)
              }
            } else if (res.code == 2 && res.data.fieldErrors) {
              vm.$toast(res.data.fieldErrors[0].message)
            } else {
              vm.$toast(res.msg)
            }
          })
        } else {
          vm.$toast(vm.$t('common.selectRechargeChan'))
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.recharge {
  background-color: #F4F4F4;
  min-height: 130%;

  .backg {
    background: url("~assets/mine/recharge-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 384px;

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
  }
}
</style> 
<style lang="less">
.recharge {
  .van-cell {
    background-color: transparent;
    color: #87593c;
  }
}
</style> 