<template>
  <div
    class="container recharge"
    @scroll="tabScroll"
  >
    <img
      src="@/assets/mine/withdraw-top-bg.png"
      alt=""
      class="top-bg"
    >
    <div
      class="flex-center-center header-back div-sizing"
      v-if="isFixed"
    ></div>
    <div class="pay-padding">
      <div class="total-label">{{$t('mine.accountBalance')}}</div>
      <div class="total-value">₹{{balance || 0}}</div>
      <div class="with-card div-sizing">
        <div class="with-title">{{$t('mine.rechargeAmount')}}</div>
        <van-field
          v-model="number"
          type="number"
          label="₹"
        />
        <div class="flex-between-center with-bank">
          <div class="left-label">{{$t('mine.rechargeMethods')}}</div>
        </div>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              :title="item.name"
              clickable
              v-for="(item,index) in payType"
              :key="index+'type'"
              @click="radio = item.id"
              :class="radio == item.id ? 'ac-radio' : ''"
            >
              <template #right-icon>
                <van-radio
                  :name="item.id"
                  checked-color="#0b504A"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="vant-btn">
          <van-button @click="putRecharge">{{$t('mine.toRecharge')}}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRechargeInfo, putRecharge } from '@/api/mine'
export default {
  name: 'WorkspaceJsonRecharge',

  data() {
    return {
      number: '',
      radio: -1,
      isFixed: false,
      balance: 0,
      payType: [],
    };
  },
  watch: {
    // 监听输入数量 只允许输入小数点后两位
    number(value) {
      const index = value.indexOf('.')
      if (index !== -1) {
        if (value.substring(index + 1).length > 2) {
          value = value.substring(0, value.length - 1)
          this.number = parseFloat(value).toFixed(2)
        }
      }
    }
  },
  created() {
    this.getInfo()
  },
  mounted() {

  },

  methods: {
    getInfo() {
      let vm = this
      getRechargeInfo().then(res => {
        if (res.code == 1) {
          vm.payType = res.data
          // if (vm.payType.length > 0) {
          //   vm.radio = vm.payType[0].id
          // }
          vm.balance = res.rechange
        }
      })
    },
    putRecharge() {
      let vm = this
      if (vm.number == '' || vm.number == 0) {
        vm.$toast(vm.$t('common.numRechargeToast'))
      } else {
        let isChange = false
        vm.payType.forEach(item => {
          if (item.id == vm.radio) {
            isChange = true
          }
        })
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
              // window.open(res.data.paymentUrl)
              // vm.number = ''
              // vm.getInfo()
              // vm.$toast(res.msg)
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
    tabScroll(e) {
      let top = e.target.scrollTop
      if (top > 60) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
  },
};
</script>

<style lang="less" scoped>
.recharge {
  .van-cell-group {
    .van-cell {
      padding: 0;
      border: none;
    }
  }
}
</style>

<style lang="less">
.recharge {
  .with-card > .van-cell {
    .van-cell__title {
      width: auto;
      color: #323232;
      font-size: 60px;
    }
  }
  .van-cell-group {
    margin-top: 10px;
    &::after {
      display: none;
    }
    .van-cell {
      margin-bottom: 10px;
      .van-cell__title {
        span {
          display: inline-block;
          transform: scale(0.8);
          transform-origin: 0 50%;
        }
      }
      .van-radio {
        display: none;
      }
    }
    .ac-radio {
      .van-radio {
        display: block;
      }
    }
  }
}
</style>