<template>
  <div class="funding-container">
    <div class="funding-balance">
      <div class="funding-balance-title">{{ tabIndex == 2 ? $t('mine.curBa') : tabIndex == 3 ? $t('mine.curWit') :
          $t('mine.curRec')
      }}：</div>
      <div class="funding-balance-jine">₹{{ number || 0 }}</div>
    </div>
    <div class="funding-padding">
      <van-tabs v-model="tabIndex" sticky :before-change="beforeChange" type="card">
        <van-tab v-for="(tab, index) in tabList" :key="index + 'tab'" :title="$t(tab.name)" :name="tab.id">
          <template #title>
            <!-- <img src="@/assets/mine/tab1.png" class="card-img" v-if="tab.id == 1" />
            <img src="@/assets/mine/tab2.png" class="card-img" v-if="tab.id == 2" />
            <img src="@/assets/mine/tab3.png" class="card-img" v-if="tab.id == 3" />  -->{{$t(tab.name)}}
          </template>
          <van-pull-refresh v-model="refreshing" :pulling-text="$t('common.pullingText')"
            :loosing-text="$t('common.loosingText')" :loading-text="$t('common.loading')" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" :finished-text="$t('common.noMore')"
              :loading-text="$t('common.loading')" :error-text="$t('common.errorText')" :error.sync="error"
              @load="onLoad" :immediate-check="false">
              <div class="list">
                <div class="list1" v-for="(item, d) in list" :key="d + 'de'">
                  <van-row class="div4">
                    <van-col span="1" class="div1">
                      <!-- <img class="image1"  :src="require('../../assets/mine/level-logo1.png')"/> -->
                    </van-col>
                    <van-col span="10" class="div2">
                      <div class="list2">{{ item.message }}</div>
                      <div class="list3">{{ item.time }}</div>
                    </van-col>
                    <van-col class="div3" span="6">₹{{ item.num }}</van-col>
                  </van-row>
                  <div class="line"></div>
                </div>

              </div>
            </van-list>
          </van-pull-refresh>

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getAccountLog } from '@/api/mine'
export default {
  name: 'WorkspaceJsonFundingDetails',

  data() {
    return {
      tabIndex: 2,
      tabList: [{
        name: 'home.balance',
        id: 2,
      }, {
        name: 'head.recharge',
        id: 1
      }, {
        name: 'head.withdraw',
        id: 3
      }],
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      number: 0,
    };
  },
  watch: {
    tabIndex(val) {
      this.list = []
      this.onRefresh()
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.$route.query.t) {
        this.tabIndex = parseInt(this.$AES.decrypt(this.$route.query.t))
      } else {
        this.list = []
        this.onRefresh()
      }
    })
  },
  mounted() {

  },

  methods: {
    beforeChange(index) {
      if (this.loading) {
        return false
      } else {
        return true
      }
    },
    onLoad() {
      let vm = this
      getAccountLog({ type: vm.tabIndex, page: vm.page }).then(res => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        vm.loading = false
        if (res.code == 1) {
          vm.number = res.data.now_assets
          let list = res.data.list
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
  },
};
</script>

<style lang="less" scoped>
.funding-container {
  width: 750px;
  min-height: 100%;
  background: #FF967D;
  padding-top: 1rem;

  .funding-balance {

    .funding-balance-title {
      text-align: center;
      padding-top: 50px;
      font-size: 29px;
      font-weight: 500;
      color: #ffffff;

    }

    .funding-balance-jine {
      text-align: center;
      padding-top: 50px;
      font-size: 60px;
      color: #FFF;
    }
  }

  .funding-padding {

    // padding: 0 30px;
    .card-img {
      width: 42px;
      height: 43px;
      vertical-align: middle;
    }
  }

  .list {
    width: 95%;
    margin: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #FCEFEC;

    .line {
      height: 1px;
      background-color: #C0C0C0;
      // margin-bottom: 20px;
    }

    .list1 {
      margin-top: 30px;
      margin-left: 50px;
      margin-right: 30px;

      .image1 {
        width: 96px;
        height: 96px;
      }

      .list2 {
        font-size: 29px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #000000;
      }

      .list3 {
        margin-top: 20px;
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #B6B6B6;
      }

      .div4 {
        margin-bottom: 20px;
      }

      .div1 {
        margin-top: 30px;
        // margin-left: 30px;
        // text-align: center;
      }

      .div2 {
        margin-top: 30px;

      }

      .div3 {
        margin-top: 30px;
        font-size: 40px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: center;
        color: #000000;
      }
    }
  }
}
</style>
<style lang="less">
.funding-container {
  .van-tabs__nav--card {
    height: 80px;
    border: 0px;
    background-color: transparent;
  }

  .van-tabs__nav--card .van-tab {
    border-right: 0px solid #ee0a24;
  }

  .van-tabs__nav--card .van-tab.van-tab--active {
    border-radius: 5px;

    background: #798dfe;
    border-radius: 37px;

    color: #FFF;

  }

  .van-tabs__nav--card .van-tab.van-tab--active .van-tab__text {}

  .van-tabs__nav--card .van-tab {

    color: #333333;
    margin-left: 20px;
   
    background: #C3D7FB;
    border-radius: 37px;
  }

  .van-sticky {
    padding-top: 30px;
    // background-color: #FAFBFF;
  }
}
</style>
