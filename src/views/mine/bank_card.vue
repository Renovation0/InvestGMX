<template>
  <div class="bankcard">
    <div class="banklist" v-for="(item, index) in list" :key="index + 'bank'">
      <van-row class="bank-card1">
          <van-col span="16">{{ item.account_num }}
            <!--银行名称-->
          </van-col>
          <van-col span="8">{{ item.tel }}</van-col>
        </van-row>
        <div class="bank-card1">{{ item.bank_num }}
          <!--银行卡卡号-->
        </div>
        <van-row class="bank-card1">
          <van-col span="16">{{ item.name }}
            <!--姓名-->
          </van-col>
          <van-col span="8">{{ item.ifsc }}</van-col>
        </van-row>
        <van-row class="bank-card1">
          <van-col offset="16" span="8"><span
              @click="$router.push({ path: '/mAddBank', query: { id: item.id }, meta: { title: '213' } })">{{ $t('mine.edit')
              }}</span><span @click="delbank(item.id)">{{ $t('mine.delete') }}</span></van-col>
        </van-row>
    </div>
    <div class="addbank" >
      <img src="@/assets/mine/plus.png" class="addbank-img" @click="$router.push('/mAddBank')"  />
      <div class="wenzi1" @click="$router.push('/mAddBank')" >{{$t('mine.addBankCard')}}</div>
    </div>
  </div>
</template>
 
<script>
import { getBankList, delBank } from '@/api/mine'
export default {
  name: 'WorkspaceJsonBankCard',
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    delbank(id) {
      const vm = this
      this.$dialog.confirm({
        title: vm.$t('mine.hint'),
        confirmButtonText: vm.$t('mine.conFirm'),
        cancelButtonText: vm.$t('mine.cancel'),
        message: vm.$t('mine.delbank')
      }).then(() => {
        delBank({ id: id }).then(res => {
          location.reload()
          //vm.getInfo();
        });
      }).catch(() => { })
    },
    getInfo() {
      let vm = this
      getBankList().then(res => {
        if (res.code == 1) {
          vm.list = res.data
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.bankcard {
  padding-top: 1rem;
  .banklist {
    width: 90%;
    margin: auto;
    margin-top: 30px;
    height: 268px;
    background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%);
    .bank-card1 {
      padding-top: 20px;
      text-align: left;
      padding-left: 60px;
      height: 50px;
      color: #fff;
      font-size: 30px;
      font-weight: 100;

      span {
        margin-left: 10px;
      }
    }
  }
  .addbank{
    margin-top: 30px;
    text-align: center;
    .addbank-img{
      width: 153px;
      height: 153px;
    }
    .wenzi1{
font-size: 30px;
color: #333333;
line-height: 50px;
    }
  }
}
</style>