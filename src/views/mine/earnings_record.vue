<template>
  <div class="earn-container">
    <div class="line">
      <van-row style="text-align: center;">
        <van-col span="8"
          ><img :src="userinfo.u_img" class="line-img"
        /></van-col>
        <van-col span="8">
          <div class="col2-l">{{ userinfo.tel }}</div>
          <div class="col2-r">ID:{{ userinfo.guid }}</div>
        </van-col>
        <van-col span="8"
          ><img src="@/assets/mine/order-f.png" class="order-f-img"
        /></van-col>
      </van-row>
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
          class="record-list"
          v-for="(item, index) in list"
          :key="index + 'log'"
        >
          <van-row>
            <van-col span="7">
              <img :src="item.logo" class="record-img" />
            </van-col>
            <van-col span="16">
              <div class="col2-fiv">
                <van-row>
                  <van-col span="12" class="record-l"
                    ><nobr>{{ item.name }}</nobr></van-col
                  >
                  <van-col span="12" class="record-r"
                    ><nobr
                      >{{ $t("mine.buyTime") }}:<span>{{
                        item.sta_time
                      }}</span></nobr
                    ></van-col
                  >
                </van-row>
                <van-row>
                  <van-col span="12" class="record-l"
                    ><nobr
                      >{{ $t("home.buyPrice") }}:₹{{ item.get_price }}</nobr
                    ></van-col
                  >
                  <van-col span="12" class="record-r"
                    ><nobr
                      >{{ $t("mine.expirationTime") }}::<span>{{
                        item.end_time
                      }}</span></nobr
                    ></van-col
                  >
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
import { getEarningLog } from "@/api/mine";
export default {
  name: "WorkspaceJsonEarningsRecord",

  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      userinfo: {},
    };
  },

  mounted() {},
  created() {
    this.userinfo = JSON.parse(
      this.$AES.decrypt(this.$cookie.get("userInfoSP"))
    );
    console.log(this.userinfo);
  },
  methods: {
    onLoad() {
      let vm = this;
      getEarningLog({ type: vm.tabIndex, page: vm.page }).then(
        (res) => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          vm.loading = false;
          if (res.code == 1) {
            let list = res.data.list;

            vm.list = [...vm.list, ...list];
            if (res.data.pages > vm.page) {
              vm.page++;
            } else {
              vm.finished = true;
            }
          } else {
            vm.error = true;
          }
        },
        () => {
          vm.loading = false;
          vm.error = true;
        }
      );
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
.earn-container {
  padding-top: 1rem;
  background: url("~assets/mine/order-bg.png") no-repeat scroll top center
    #f5ecea;
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

    .order-f-img {
      width: 109px;
      height: 162px;
    }
  }

  .record-list {
    width: 95%;
    margin: 20px auto;
    background: url("~assets/mine/order-ff.png") no-repeat scroll right 40px
      center #fff;
    background-size: 115px 134px;
    height: 203px;
    border-radius: 100px;

    .record-img {
      margin-top: 30px;
      margin-left: 50px;
      width: 118px;
      height: 118px;
      border-radius: 20px;
    }

    .col2-fiv {
      margin-top: 30px;
    }

    .record-l {
      font-size: 28px;
      text-align: left;
      color: #333333;
      line-height: 50px;
    }

    .record-r {
      line-height: 50px;
      font-size: 20px;
      text-align: left;
      color: #666666;

      span {
        color: #ffb19f;
      }
    }
  }
}
</style>
