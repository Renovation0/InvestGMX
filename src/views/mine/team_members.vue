<template>
  <div class="container con-padding team-members">
    <img
      src="@/assets/mine/invite-tag.png"
      alt=""
      class="invite-tag"
    >
    <div
      class="header-div"
      ref="head"
    ></div>
    <van-tabs
      v-model="tabIndex"
      sticky
      :before-change="beforeChange"
    >
      <van-tab
        v-for="(item,index) in tabList"
        :key="index+'tab'"
        :title="$t('team.level')+' '+item.name"
        :name="item.id"
      >
        <div
          class="tab-content div-sizing"
          :style="'height:'+listHeight+'px'"
        >
          <div class="flex-between-center con-title">
            <div class="left-title">{{$t('team.memInfo')}}</div>
            <!-- <div class="left-title">Cumulative recharge</div> -->
          </div>
          <van-pull-refresh
            v-model="refreshing"
            :pulling-text="$t('common.pullingText')"
            :loosing-text="$t('common.loosingText')"
            :loading-text="$t('common.loading')"
            @refresh="onRefresh"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="$t('common.noMore')"
              :loading-text="$t('common.loading')"
              :error-text="$t('common.errorText')"
              :error.sync="error"
              @load="onLoad"
            >
              <div
                class="flex-between-center con-title"
                v-for="(item,index) in list"
                :key="index+'user'"
              >
                <div class="flex-between-center left-con">
                  <img
                    :src="item.u_img"
                    alt=""
                    class="left-img"
                  >
                  <div class="con-info">
                    <div class="name">{{item.user}} <img
                        :src="item.level"
                        alt=""
                        class="level"
                      ></div>
                    <div class="flex-between-center right-btm">
                      <div class="btm-tel">{{item.tel}}</div>
                      <div class="btm-btn"><a :href="'tel:'+item.tel"><span>{{$t('team.call')}}</span></a></div>
                    </div>
                  </div>
                </div>
                <!-- <div class="right-con">₹{{item.accumulated_top_up}}</div> -->
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getTeam } from '@/api/mine'
export default {
  name: 'WorkspaceJsonTeamMembers',

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
      listHeight: 400,
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
    };
  },

  watch: {
    tabIndex(val) {
      this.list = []
      this.onRefresh()
    }
  },
  mounted() {
    const client = this.$getViewportSize()
    let head = this.$refs.head.offsetHeight
    this.listHeight = client.height - head
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
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
.team-members {
  .invite-tag {
    width: 208px;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 13;
    border-radius: 0 0 500px 0;
  }
  .header-div {
    height: 280px;
  }
  .van-pull-refresh {
    height: auto;
  }
  .van-tabs {
    .tab-content {
      padding: 40px;
      margin-top: 0;
      background: #ffffff;
      overflow-y: scroll;
      border-radius: 40px 40px 0 0;
      position: relative;
      z-index: 14;
      .con-title {
        margin-bottom: 50px;
      }
      .left-con {
        justify-content: flex-start;
        .left-img {
          width: 88px;
          height: 88px;
          margin-right: 20px;
          border-radius: 10px;
        }
        .con-info {
          .name {
            font-weight: bold;
            margin-top: 12px;
            .level {
              width: auto;
              height: 32px;
              margin-left: 10px;
              vertical-align: middle;
            }
          }
          .right-btm {
            justify-content: flex-start;
            align-items: flex-end;
            .btm-tel {
              color: #696969;
              transform: scale(0.8);
              transform-origin: 0 50%;
            }
            .btm-btn {
              width: 82px;
              height: 36px;
              line-height: 36px;
              margin-left: -20px;
              color: #0b504a;
              text-align: center;
              border: 2px solid #0b504a;
              border-radius: 26px;
              a {
                color: #0b504a;
              }
              span {
                display: inline-block;
                transform: scale(0.8);
                transform-origin: 50% 50%;
              }
            }
          }
        }
      }
      .right-con {
        color: #0b504a;
        font-size: 36px;
      }
    }
  }
}
</style>

<style lang="less">
.team-members {
  .van-tabs {
    .van-sticky {
      width: 100%;
      height: 320px;
      padding: 200px 60px 60px;
      box-sizing: border-box;
      background: #0b504a;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
    }
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
      display: none;
    }
    .van-tab {
      flex: none;
      margin-right: 80px;
      font-size: 28px;
      color: rgba(#ffffff, 0.5);
    }
    .van-tab--active {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>