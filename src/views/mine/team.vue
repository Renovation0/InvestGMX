<template>
  <div class="team">
    <img src="@/assets/mine/team-top.png" class="team-top" />
    <img src="@/assets/mine/team-top1.png" class="team-top1" />
    <div class="top">
      <div class="wenzi1">{{ taskInfo.task_info }}</div>
      <!-- <div class="wenzi2">收益多多</div> -->
    </div>
    <div class="reward">
      <div class="title">Reward</div>
      <div class="jjin">₹{{ taskInfo.jl_num }}</div>
      <div class="jjin2">{{ $t('mine.ljsy') }}</div>
      <div class="jjin3">Reward Income</div>
      <div class="jjin4">₹{{ taskInfo.jl_num }}</div>
      <div class="btn" @click="getTask">{{ $t('team.getTheRewards') }}</div>
      <div class="notice">
        <!--:left-icon="imgurl"-->
        <van-notice-bar background="transparent" color="#000" class="team-notice" :scrollable="false">
          <van-swipe vertical class="notice-swipe" :touchable="false" :show-indicators="false" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in noticeInfo" :key="index"> {{ item.tel }} for receiving ₹{{
    item.money
}}
              promotion award</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </div>
      <div class="rewardlevel">
        <div class="rl-title">{{ $t('mine.dqsy') }}</div>
        <div class="sydj">
          <van-row class="row">
            <van-col span="6">Level</van-col>
            <van-col span="8">{{ $t('mine.cygm') }}</van-col>
            <van-col span="10">{{ $t('mine.yxrq') }}</van-col>
          </van-row>
          <van-row class="row">
            <van-col span="6">
              <div class="col1">1</div>
            </van-col>
            <van-col span="8">{{ teaminfo.level }}</van-col>
            <van-col span="10">{{ teaminfo.level1 }} </van-col>
          </van-row>
          <van-row class="row">
            <van-col span="6">
              <div class="col1">2</div>
            </van-col>
            <van-col span="8">{{ teaminfo.level2 }}</van-col>
            <van-col span="10">{{ teaminfo.level21 }} </van-col>
          </van-row>
          <van-row class="row">
            <van-col span="6">
              <div class="col1">3</div>
            </van-col>
            <van-col span="8">{{ teaminfo.level3 }}</van-col>
            <van-col span="10">{{ teaminfo.level31 }} </van-col>
          </van-row>
        </div>
      </div>
      <div class="team-member">
        <div class="rl-title">Team Size</div>
        <van-row class="row1" @click="$router.push('/mMyTeam')">
          <van-col span="12">
            <div class="number1">
              <div>{{ teaminfo.count }}</div>
              <div class="number2">+</div>
            </div>
            <div class="number3">{{ $t('mine.cygm') }}</div>
            <img src="@/assets/mine/rewards.png" class="rewards" />
          </van-col>
          <van-col span="12">
            <div class="number1">
              <div>{{ teaminfo.count1 }}</div>
              <div class="number2">+</div>
            </div>
            <div class="number3">{{ $t('mine.yxrq') }}</div>
            <img src="@/assets/mine/rewards.png" class="rewards" />
          </van-col>
          <!-- <van-col span="8">
            <div class="number1">
              <div>{{ teaminfo.count1 }}</div>
              <div class="number2">+</div>
            </div>
            <div class="number3">more..</div>
            <img src="@/assets/mine/rewards.png" class="rewards" />
          </van-col> -->
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { homeSwiperNotice_new } from '@/api/index'
import { getTeam, getTeamnew, getTaskInfo, putTaskAward } from '@/api/mine'
import { Image as VanImage } from 'vant'
export default {
  components: {
    [VanImage.name]: VanImage,

  },
  name: 'Team',
  data() {
    return {
      tabIndex: 1,
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
      imgurl: require('../../assets/mine/team-notice.png'),
      noticeInfo: {},
      teaminfo: {},
      totalRecharge: 0,
      taskInfo: {},
      loadingtext: '',
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      list: [],
      page: 1,
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
    this.get_homeSwiper()
    this.getTeam()
    this.getTaskInfo()
  },
  methods: {
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
    getTask() {
      let vm = this
      putTaskAward().then(res => {
        if (res.code == 1) {
          // vm.isResult = 1
          // vm.resultText = vm.$t('team.taskSuccess')
          vm.$toast(vm.$t('team.taskSuccess'))
        } else {
          // vm.isResult = 2
          // vm.resultText = vm.$t('team.taskFail')
          vm.$toast(vm.$t('team.taskFail'))
        }
        // vm.showResult = true
      })
    },
    getTaskInfo() {
      let vm = this
      getTaskInfo().then(res => {
        if (res.code == 1) {
          vm.totalRecharge = res.data.total_recharge || 0
          vm.taskInfo = res.data.task_info
        }
      })
    },
    getTeam() {
      let vm = this
      getTeamnew({}).then(res => {
        if (res.code == 1) {
          vm.teaminfo = res.data
          // vm.count = res.data.count
          // vm.count1 = res.data.count1
        }
      })
    },
    get_homeSwiper() {
      const vm = this;
      homeSwiperNotice_new().then((res) => {
        if (res.code === 1) {
          vm.noticeInfo = res.data;
        } else {
          vm.$toast(res.msg)
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.team {
  min-height: 180%;
  background: linear-gradient(0deg, #ee4900 0%, #fcb173 150%);
  padding-top: 1rem;
  position: relative;
  z-index: -3;
  padding-bottom: 200px;

  .team-top {
    width: 548px;
    height: 632px;
    position: absolute;
    top: 200px;
    left: 80px;
    z-index: -2;
  }

  .team-top1 {
    width: 666px;
    height: 561px;
    position: absolute;
    top: 330px;
    left: 80px;
    z-index: -2;
  }

  .top {
    width: 80%;
    margin: 20px auto;
    height: 258px;
    background: rgba(255, 255, 255, 0.32);
    border-radius: 26px;
    box-shadow: -1px 0px 1px 1px #ffffff inset;

    .wenzi1 {
      margin-left: 20px;
      padding-top: 20px;
      font-size: 30px;
      font-style: italic;
      text-align: left;
      color: #ffffff;
      line-height: 50px;
      text-shadow: 0.33px 0.95px 0px 0.55px #eb6941 inset;
    }
  }

  .reward {
    background: url("~assets/mine/team-reward.png") no-repeat;
    background-size: 100% 100%;
    width: 90%;
    margin: auto;
    margin-top: 400px;
    height: 652px;

    .title {
      text-align: center;
      padding-top: 160px;
      font-size: 32px;
      text-align: center;
      color: #ffffff;
    }

    .jjin {
      margin-top: 100px;
      font-size: 38px;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      letter-spacing: 2.26px;
    }

    .jjin2 {

      font-size: 26px;

      font-weight: bold;
      text-align: center;
      color: #ffffff;
    }

    .jjin3 {
      margin-top: 40px;
      font-size: 25px;
      text-align: center;
      color: #343434;
    }

    .jjin4 {
      margin-top: 20px;
      font-size: 33px;
      text-align: center;
      color: #c6262d;
    }

    .btn {
      width: 325px;
      margin: 10px auto;
      height: 69px;
      background: #ff5148;
      border-radius: 35px;
      text-align: center;
      font-size: 31px;
      color: #ffffff;
      line-height: 69px;
    }

    .notice {
      width: 90%;
      margin: auto;

      .team-notice {
        border-radius: 50px;
        height: 60px;
      }
    }
  }

  .rewardlevel {
    margin-top: 30px;
    background: url("~assets/mine/rewardlevel.png") no-repeat;
    background-size: 100% 100%;
    height: 518px;

    .rl-title {

      padding-top: 30px;
      font-size: 36px;
      text-align: center;
      color: #4d2101;
    }

    .sydj {

      width: 90%;
      margin: 20px auto;
      border-radius: 50px;

      .row {
        padding: 20px;
        text-align: center;
        font-size: 30px;
        color: #363636;
        background-color: #FDE2CD;
        margin: 20px 0px;
        border-radius: 50px;
      }
    }
  }

  .team-member {
    margin-top: 30px;
    background: url("~assets/mine/rewardlevel.png") no-repeat;
    background-size: 100% 100%;
    height: 400px;

    .rl-title {
      padding-top: 20px;
      font-size: 36px;
      text-align: center;
      color: #4d2101;
    }

    .row1 {
      margin-top: 20px;
      text-align: center;

      .number1 {
        font-size: 79px;
        font-family: SourceHanSansCN, SourceHanSansCN-Heavy;
        font-weight: 800;
        color: #4d2101;
        display: flex;
        justify-content: center;

        .number2 {
          font-size: 29px;
          color: #4d2101;
        }

      }

      .number3 {
        margin-top: 20px;
        font-size: 22px;
        color: #4d2101;
      }

      .rewards {
        margin-top: 20px;
        width: 104px;
        height: 82px;
      }
    }
  }
}

.notice-swipe {
  height: 30px;
  line-height: 30px;
}
</style>