<template>
  <div class="my-team">
    <div class="seedtitle">{{$t('mine.myteam')}}</div>
    <div class="content">Every time 5 team members (Level 1) are invited to invest in any product on the App,you can apply for a team bonus of  ₹250，Can be collected repeatedly！</div>
    <van-tabs class="team-tabs" v-model="tabIndex" type="card">
      <van-tab v-for="(item, index) in tabList" :key="index + 'tab'" :title="item.name + $t('team.level')" :name="item.id">
        <template #title>
          <div class="active">{{ item.name + $t('team.level') }}</div>
          <img v-if="tabIndex == index + 1" src="@/assets/mine/sanjiao.png" class="pro-left">
        </template>
        <van-pull-refresh v-model="refreshing" :pulling-text="$t('common.pullingText')"
          :loosing-text="$t('common.loosingText')" :loading-text="loadingtext" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$t('common.noMore')"
            :loading-text="loadingtext" :error-text="$t('common.errorText')" :error.sync="error" @load="onLoad">

            <div v-for="(item,index) in list" :key="index+'user'">
              <van-row class="team-list">
                <van-col span="6" style="text-align: right;">
                  <img :src="item.u_img" class="team-list-img">
                </van-col>
                <van-col span="8">
                  <div class="row21">{{item.tel}}</div>
                  <div class="row22">ID:{{ 800000 + item.id }}</div>
                </van-col>
                <van-col span="6"><span class="row3">{{item.level1}}</span></van-col>
              </van-row>
              <div class="line"></div>
            </div>

          </van-list>
        </van-pull-refresh>


      </van-tab>
      <!-- <van-tab>
        <template #title>
          <div class="active">2级成员</div>
          <img v-if="tabIndex == 1" src="@/assets/mine/sanjiao.png" class="pro-left">
        </template>
        内容2
      </van-tab>
      <van-tab>
        <template #title>
          <div class="active">3级成员</div>
          <img v-if="tabIndex == 2" src="@/assets/mine/sanjiao.png" class="pro-left">
        </template>
        内容3
      </van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import { getTeam } from '@/api/mine'
import { Image as VanImage } from 'vant'
export default {
  components: {
    [VanImage.name]: VanImage,

  },
  name: 'Team',
  data() {
    return {
      tabIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      list: [],
      page: 1,
      tabList: [{
        name: '1',
        id: 1,
      }, {
        name: '2',
        id: 2,
      }, {
        name: '3',
        id: 3
      }],
      loadingtext: '',
    }
  },
  watch: {
    tabIndex(val) {
      this.list = []
      this.onRefresh()
    }
  },
  created() {
    this.loadingtext = this.$t('common.loading')
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
      getTeam({ type: vm.tabIndex, page: vm.page }).then(res => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        vm.loading = false
        if (res.code == 1) {
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
      this.page = 1
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
}
</script>

<style lang="less" scoped>
.my-team {
  background: url("~assets/mine/tee-bg.png") no-repeat;
  background-size: 100% 100%;
  height: 400px;
  .seedtitle {
    margin-top: 120px;
    margin-left: 100px;
    font-size: 60px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    font-weight: normal;
    text-align: left;
    color: #ffffff;
    line-height: 24px;
  }
  .content{
    margin-top: 20px;
    margin-left: 100px;
    font-size: 30px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    font-weight: normal;
    text-align: left;
    color: #ffffff;
    line-height: 35px;
  }

  .team-tabs {
    margin-top: 32px;
    color: #FFF;
    .pro-left {
     
      margin-bottom: -10px;
      height: 30px;
      width: 30px;
    }

    .team-list {
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;

      .team-list-img {
        width: 90px;
        height: 90px;
        border-radius: 50px;
      }

      .row21 {
        margin-top: 15px;
        font-size: 32px;
        font-family: inpinheiti, inpinheiti-Regular;
        font-weight: 400;
        color: #000000;
      }

      .row22 {
        margin-top: 10px;
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }

      .row3 {
        // opacity: 0.1;
        padding: 5px 20px;
        background: #E9F2FF;
        border-radius: 19px;
        font-size: 24px;
        font-family: inpinheiti, inpinheiti-Regular;
        font-weight: 400;
        text-align: left;
        color: #6AA5FE;
        line-height: 100px;
      }
    }

    .line {
      height: 10px;
      background-color: #f3f3f3;
    }
  }
}
</style>
<style lang="less" >
.my-team {
  .van-tab__text--ellipsis {
    text-align: center;
    color: #FFF;
    height: 70px;
  }

  .van-tabs__wrap {
    height: 70px;
  }

  .van-tabs__nav {
    background-color: transparent;
  }

  .van-tabs__nav--card {
    border: 0px solid #ee0a24;
    height: 70px;
  }

  .van-tabs__nav--card .van-tab {
    border-right: 0px solid #ee0a24;
  }

  .van-tabs__nav--card .van-tab.van-tab--active {
    color: #FFF;
    background-color: transparent;
  }
}
</style>