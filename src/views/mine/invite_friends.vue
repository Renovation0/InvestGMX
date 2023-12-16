<template>
  <div
    class="container invite-friends"
    @scroll="tabScroll"
  >
    <img
      src="@/assets/mine/invite-tag.png"
      alt=""
      class="invite-tag"
    >
    <div
      class="flex-center-center header-back div-sizing"
      v-if="isFixed"
    ></div>
    <div class="page-content">
      <div class="card-title">{{$t('team.invLink')}}</div>
      <div class="link-card">
        <div class="link-line van-multi-ellipsis--l2">{{shareUrl}}</div>
        <div class="vant-btn">
          <van-button
            v-clipboard:copy="shareUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >{{$t('team.copyLink')}}</van-button>
        </div>
      </div>
      <div class="other-info-card">
        <div class="card-title">{{$t('team.howInVIPL')}}</div>
        <div class="level-list">
          <div class="flex-between-center level-item">
            <div class="item-label">{{$t('team.vipLevel')}}</div>
            <div class="item-value">{{$t('team.CumulativePur')}}</div>
            <img
              src="@/assets/mine/invite-level-icon.png"
              alt=""
              class="level-icon"
            >
          </div>
          <div
            class="flex-between-center level-item"
            v-for="(vip,v) in VIPList"
            :key="v+'vip'"
          >
            <div class="item-label">{{vip.name}}</div>
            <div class="item-value">₹{{vip.pet_assets}}</div>
          </div>
        </div>
      </div>
      <van-tabs v-model="tabIndex">
        <van-tab
          v-for="(item,index) in tabList"
          :key="index+'tag'"
          :title="$t('team.level')+' '+item.name"
        >
          <div class="other-info-card">
            <div class="card-title">{{$t('team.invDescript')}}</div>
            <div class="top-content"><span>{{$t('team.descriptContent')}}</span></div>
            <div class="flex-between-center content-line">
              <div class="line-label">{{$t('team.teamMemLevel')}}</div>
              <div class="line-value">{{$t('team.CommRation')}}
              </div>
            </div>
            <div class="flex-between-center content-line">
              <div class="line-label">{{$t('team.directMem')}}</div>
              <div class="line-value">30%
              </div>
            </div>
            <div class="flex-between-center content-line">
              <div class="line-label">{{$t('team.secondaryMem')}}</div>
              <div class="line-value">6%
              </div>
            </div>
            <div class="flex-between-center content-line">
              <div class="line-label">{{$t('team.thirdtierMem')}}</div>
              <div class="line-value">3%
              </div>
            </div>
            <div class="other-content">
              <span>{{$t('team.condition1')}}</span>
            </div>
            <div class="other-content">
              <span>{{$t('team.condition2')}}</span>
            </div>
            <div class="other-content">
              <span>{{$t('team.condition3')}}</span>
            </div>
            <div class="other-content">
              <span>{{$t('team.condition4')}}</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getTeam, getInviteInfo } from '@/api/mine'
export default {
  name: 'WorkspaceJsonInviteFriends',

  data() {
    return {
      tabIndex: 0,
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
      isFixed: false,
      shareUrl: '',
      VIPList: [],
    };
  },
  created() {
    this.getInviteInfo()
  },
  mounted() {

  },

  methods: {
    getInviteInfo() {
      let vm = this
      getInviteInfo().then(res => {
        if (res.code == 1) {
          vm.shareUrl = res.data.img_url
          vm.VIPList = res.data.level_list
        } else {
          vm.$toast(res.msg)
        }
      })
    },
    tabScroll(e) {
      let top = e.target.scrollTop
      if (top > 60) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    onCopy(e) {
      this.$toast.success(this.$t('common.copySucess'))
    },
    onError(e) {
      this.$toast.error(this.$t('common.copyFail'))
    }
  },
};
</script>

<style lang="less" scoped>
.invite-friends {
  background: rgba(#0b504a, 0.9);
  .invite-tag {
    width: 208px;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .page-content {
    padding: 30px;
    color: #ffffff;
    position: relative;
    z-index: 11;
    .card-title {
      margin-bottom: 20px;
    }
    .link-card {
      padding: 30px;
      margin-bottom: 50px;
      background: rgba(#ffffff, 0.3);
      border-radius: 20px;
      box-shadow: rgba(#000000, 0.1) 0 10px 20px -10px;
      .link-line {
        margin-bottom: 30px;
      }
      .vant-btn {
        .van-button {
          width: 100%;
          height: 64px;
          line-height: 64px;
        }
      }
    }
    .other-info-card {
      padding: 40px;
      color: #323232;
      background: #ffffff;
      border-radius: 20px;
      .card-title {
        font-weight: bold;
        text-align: center;
        margin-bottom: 36px;
      }
      .level-list {
        .level-item {
          padding: 30px 0 30px 70px;
          text-align: center;
          position: relative;
          border-bottom: 2px solid #e5e5e5;
          &:last-child {
            border: none;
          }
          .item-label {
            width: 150px;
          }
          .item-value {
            min-width: 260px;
          }
          .level-icon {
            width: 40px;
            height: 40px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .van-tabs {
      .other-info-card {
        .top-content {
          color: #6e6e6e;
          line-height: 36px;
          span {
            width: 125%;
            display: inline-block;
            transform: scale(0.8);
            transform-origin: 0 0;
          }
        }
        .content-line {
          margin-bottom: 50px;
          align-items: flex-start;
          .line-label {
            width: 290px;
            margin-right: 30px;
          }
          .line-value {
            flex: 1;
          }
        }
        .other-content {
          color: #6e6e6e;
          line-height: 36px;
          span {
            width: 125%;
            display: inline-block;
            transform: scale(0.8);
            transform-origin: 0 0;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.invite-friends {
  .van-tabs {
    margin-top: 20px;
    .van-tabs__wrap {
      height: 60px;
      line-height: 60px;
    }
    .van-tabs__nav {
      background: none;
    }
    .van-tabs__line {
      width: 62px;
      height: 4px;
      background: #ffffff;
      border-radius: 20px;
    }
    .van-tab {
      flex: none;
      margin-right: 100px;
      font-size: 28px;
      color: rgba(#ffffff, 0.5);
    }
    .van-tab--active {
      color: #ffffff;
    }
    .other-info-card {
      margin-top: 30px;
    }
  }
}
</style>