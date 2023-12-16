<template>
  <div class="add-bank">
    <div class="top-wenzi">Complete data adding bank card</div>
    <img src="@/assets/mine/order-bg.png" class="top-img" />
    <div class="addbank">
      <!-- <img src="@/assets/mine/addbank.png" class="addbank-img" /> -->
      <!-- <div class="addbank-img">
        <img src="@/assets/mine/new/visa.png" class="addbank-img2" />
        <div class="wenzi">**** **** **** ****</div>
      </div> -->
      <van-form @submit="onSubmit">
        <van-field class="mt20" v-model="name" name="name" label="Name"
          :left-icon="require('@/assets/mine/new/user.png')" :placeholder="$t('login.name')"
          :rules="[{ required: true, message: '' }]" />
        <van-field class="mt20" v-model="phone" :left-icon="require('@/assets/mine/new/tel.png')" name="tel"
          label="Phone" :placeholder="$t('login.plaMobil')" :rules="[{ required: true, message: '' }]" />
        <van-field class="mt20" :left-icon="require('@/assets/mine/new/bank.png')" v-model="bank_name" readonly
          name="account_num" label="Bank name" :placeholder="$t('mine.bankName')"
          :rules="[{ required: true, message: '' }]" @focus="showSexChoice = true" />
        <van-action-sheet v-model="showSexChoice" :round="false" :actions="bankinfo" @select="onSelect">
        </van-action-sheet>
        <van-field class="mt20" :left-icon="require('@/assets/mine/new/bank.png')" v-model="bank_num" name="bank_num"
          label="Bank number" :placeholder="$t('mine.bankNum')" :rules="[{ required: true, message: '' }]" />
        <van-field class="mt20" :left-icon="require('@/assets/mine/new/ifsc.png')" v-model="ifsc" name="ifsc"
          label="IFSC" :placeholder="$t('mine.ifsc')" :rules="[{ validator: ifscValidator, message: '' }]" />
        <div style="margin: 16px;">
          <van-button round block  native-type="submit" class="cusbutton">
            {{ $t('common.submit') }}
          </van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import { loginForm } from '@/utils/mixins'
import { putAddBank, bankDetail, querybank } from '@/api/mine'
export default {
  name: 'WorkspaceJsonAddBank',

  mixins: [loginForm],
  data() {
    return {
      sexchoicecode: '',
      bankinfo: [],
      showSexChoice: false,
      id: '',
      resultText: '',
      showResult: false,
      name: '',
      phone: '',
      bank_name: '',
      bank_num: '',
      ifsc: ''
    };
  },
  created() {
    var id = this.$route.query.id; //接受参数
    if (id) {
      this.id = id
      this.paymentDetail(id)
    }
    this.querybank();
  },
  mounted() {

  },

  methods: {
    onSelect(item) {
      this.showSexChoice = false;
      this.bank_name = item.name
      this.sexchoicecode = item.code
    },
    querybank() {
      let vm = this
      querybank().then(res => {
        vm.bankinfo = res.data
      })
    },
    paymentDetail(id) {
      console.log(id)
      let vm = this
      bankDetail({ id: id }).then(res => {
        if (res.code == 1) {
          vm.name = res.data.name
          vm.phone = res.data.tel
          vm.bank_num = res.data.bank_num
          vm.bank_name = res.data.account_num
          vm.ifsc = res.data.ifsc
          vm.sexchoicecode = res.data.bank_code
        }
      })
    },
    onSubmit(values) {

      let vm = this
      if (vm.id) {
        values.id = vm.id
      }
      if (vm.sexchoicecode) {
        values.sexchoicecode = vm.sexchoicecode
      }
      putAddBank(values).then(res => {
        if (res.code == 1) {
          if (vm.id) {
            this.$router.push({ path: '/mBankCard' })
          } else {
            vm.$router.go(-1)
          }
        }
        vm.$toast(res.msg)
      })
    }
  },
};
</script>

<style lang="less" scoped>
.cusbutton{
  background: linear-gradient(0deg,#ff947c 0%, #ffb98c 100%);
  color: #fff;
}
.add-bank {
  padding-top: 1rem;
  text-align: center;
  background-color: #FCECEA;
  min-height: 100%;
  .top-wenzi {
    margin-top: 60px;
    font-size: 36px;
    color: #999999;
  }

  .top-img {
    margin-top: 20px;
    width: 100%;
    height: 165px;
  }

  .back {
    position: absolute;
    top: 260px;
    height: 100%;
    width: 100%;
    background-color: #FFF;
    border-radius: 50px;
  }

  .addbank {
    position: relative;
    z-index: 2;
    width: 90%;
    margin: 40px auto;
    height: 800px;
    border-radius: 10px;
    text-align: center;

    .addbank-img {
      background: url("~assets/mine/addbank.png") no-repeat;
      background-size: 100% 100%;
      height: 242px;
      text-align: left;

      .addbank-img2 {
        margin-left: 60px;
        margin-top: 30px;
        width: 84px;
        height: 29px;
      }

      .wenzi {
        margin-top: 30px;
        font-size: 30px;
        font-family: SourceHanSansCN, SourceHanSansCN-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        letter-spacing: 5.31px;
      }
    }
  }
}
</style>

<style lang="less">
.add-bank {
  .van-cell {
    //border: solid 1px #89baf9;
    border-radius: 50px;
    background-color:transparent;
  }

  .van-field__label {
    color: #000;
  }
}
</style>