<template>
  <div class="order-container">
    <div class="line">
      <van-row style="text-align: center;">
        <van-col span="8"><img :src="userinfo.u_img" class="line-img" /></van-col>
        <van-col span="8">
          <div class="col2-l">{{userinfo.tel}}</div>
          <div class="col2-r">ID:{{userinfo.guid}}</div>
        </van-col>
        <van-col span="8"><img src="@/assets/mine/order-f.png" class="order-f-img" /></van-col>
      </van-row>
    </div>
    <van-pull-refresh v-model="refreshing" :pulling-text="$t('common.pullingText')"
      :loosing-text="$t('common.loosingText')" :loading-text="$t('common.loading')" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" :finished-text="$t('common.noMore')"
        :loading-text="$t('common.loading')" :error-text="$t('common.errorText')" :error.sync="error" @load="onLoad">
        <div class="order-list" v-for="(item, index) in list" :key="index + 'record'">
          <van-row class="order-list-row">
            <van-col span="4">
              <img src="@/assets/mine/order-list-calc.png" class="orderlist-img" />
            </van-col>
            <van-col span="8" class="orderlist-div1">{{ $t('mine.buyTime') }}:{{ item.sta_time }}</van-col>
            <van-col span="10" class="orderlist-div1">{{ $t('mine.expirationTime') }}: {{ item.end_time }}</van-col>
          </van-row>
          <van-row class="order-cont">
            <van-col span="5">
              <img src="@/assets/home/test.png" class="order-cont-img" />
            </van-col>
            <van-col span="18">
              <div class="order-cont-title">{{ item.name }}</div>
              <div>
                <van-row>
                  <van-col span="12" class="ccol1">{{ $t('home.buyPrice') }}:₹{{ item.price }}</van-col>
                  <van-col span="12" class="ccol2">{{ $t('home.dayIncome') }}:₹{{ item.daily_ratio }}</van-col>
                  <van-col span="12" class="ccol1">{{ $t('home.totalIncome') }}:₹{{ item.allTotal }}</van-col>
                  <van-col span="12" class="ccol2">{{ $t('home.cumulativeIncome') }}:₹{{ item.creward }}</van-col>
                </van-row>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getOrderList } from '@/api/mine'
export default {
  name: 'WorkspaceJsonOrder',

  data() {
    return {
      tabIndex: 0,
      tabList: [{
        name: 'running',
        id: 1,
      }, {
        name: 'overdue',
        id: 2
      }],
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      userinfo: {}
    };
  },
  watch: {
    tabIndex(val) {
      this.list = []
      this.onRefresh()
    }
  },
  mounted() {

  },
  created() {
    this.userinfo = JSON.parse(this.$AES.decrypt(this.$cookie.get('userInfoSP')))
    console.log(this.userinfo)

  },
  methods: {
    onLoad() {
      let vm = this
      getOrderList({ type: vm.tabIndex + 1, page: vm.page }).then(res => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        vm.loading = false
        if (res.code == 1) {
          let list = res.data.list
          list.forEach(item => {
            item.allTotal = (((item.reward * 100) + (item.price * 100)) / 100).toFixed(0)
          })
          vm.list = [...vm.list, ...list]
          if (res.data.pages > vm.page) {
            vm.page++
          } else {
            vm.finished = true
          }
        } else {
          vm.error = true
        }
      }, () => {
        vm.loading = false
        vm.error = true
      })
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.page = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    goDetail(item) {

    }
  },
};
</script>

<style lang="less" scoped>
.order-container {
  padding-top: 1rem;
  background: url("~assets/mine/order-bg.png") no-repeat scroll top center #F5ECEA;
  background-size: 100% 245px;
  min-height: 99%;

  .line {
    height: 190px;

    .line-img {
      width: 94px;
      height: 94px;
      border-radius: 50%;
    }

    .col2-l {
      margin-top: 10px;
      font-size: 32px;

      text-align: left;
      color: #333333;
    }

    .col2-r {
      margin-top: 10px;
      font-size: 24px;
      text-align: left;
      color: #333333;
    }
    .order-f-img{
      width: 109px;
      height: 162px;
    }
  }

  .order-list {
    width: 90%;
    margin: 20px auto;
    background: url("~assets/mine/order-list-bg.png") no-repeat;
    background-size: 100%;
    height: 233px;
    background-color: #FFF;
    border-radius: 20px;

    .order-list-row {
      .orderlist-img {
        margin-top: 5px;
        margin-left: 20px;
        width: 41px;
        height: 44px;
      }

      .orderlist-div1 {
        margin-top: 10px;
        font-size: 20px;
        text-align: center;
        color: #333333;

      }
    }

    .order-cont {
      margin-top: 30px;
      margin-left: 30px;

      .order-cont-img {
        border-radius: 20px;
        width: 118px;
        height: 118px;
      }

      .order-cont-title {
        font-size: 32px;
        text-align: left;
        color: #333333;
        line-height: 60px;
      }

      .ccol1 {
        font-size: 26px;
        text-align: left;
        color: #999999;
      }

      .ccol2 {
        font-size: 26px;
        text-align: left;
        color: #ffb188;
      }
    }
  }
}
</style>

