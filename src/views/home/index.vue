<template>
  <div class="home-container" @click="kefushow = false">
    <div class="home-top">
      <div class="Profession">Profession</div>
      <div class="becomes">becomes value</div>
      <div class="invest">Invest to create wealth</div>
      <img class="home-top-img" src="@/assets/home/home-top1.png" />
    </div>
    <div class="home-notice-text">
      <van-notice-bar
        :left-icon="require('@/assets/home/home-notice.png')"
        :scrollable="true"
        background="#fff"
        mode="link"
        color="#000"
      >
        <van-swipe
          vertical
          class="notice-swipe"
          :touchable="false"
          :show-indicators="false"
        >
          <van-swipe-item
            v-for="(item, index) in noticeInfo"
            :key="index"
            @click="
              $router.push({
                path: 'hNoticeDetail',
                query: { i: $AES.encrypt(item.id) },
              })
            "
          >
            {{ item.description }}
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <div class="center1">
      <van-row>
        <van-col class="col1" span="12">
          <div>
            <van-row>
              <van-col span="8" class="col11">
                <img
                  class="col11-img"
                  src="@/assets/home/home-center1-recharge.png"
                />
              </van-col>
              <van-col span="16" class="col12">
                <div class="col12-div1">₹{{ totalInfo.rechange }}</div>
                <div class="col12-div2">
                  <nobr>Recharge balance</nobr>
                </div>
              </van-col>
            </van-row>
          </div>
          <div class="col2" @click="$router.push('/mRecharge')">
            {{ $t("head.recharge") }}
          </div>
        </van-col>
        <van-col class="col1" span="12">
          <div>
            <van-row>
              <van-col span="8" class="col11">
                <img
                  class="col11-img"
                  src="@/assets/home/home-center1-withdraw.png"
                />
              </van-col>
              <van-col span="16" class="col12">
                <div class="col12-div1">₹{{ totalInfo.balance }}</div>
                <div class="col12-div2">
                  <nobr>Withdraw balance</nobr>
                </div>
              </van-col>
            </van-row>
          </div>
          <div class="col2" @click="$router.push('/mWithdraw')">
            {{ $t("head.withdraw") }}
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="center2">
      <van-row style="text-align: center;">
        <van-col span="6" class="center2-col" @click="$router.push('/mOrder')">
          <img class="center2-col-img" src="@/assets/home/home-center21.png" />
          <div>{{ $t("head.earRecord") }}</div>
        </van-col>
        <van-col
          span="6"
          class="center2-col"
          @click="$router.push('/mFundingDetails')"
        >
          <img class="center2-col-img" src="@/assets/home/home-center22.png" />
          <div>{{ $t("head.funDetail") }}</div>
        </van-col>
        <van-col span="6" class="center2-col" @click="$router.push('/share')"
          ><img class="center2-col-img" src="@/assets/home/home-center23.png" />
          <div>{{ $t("head.share") }}</div>
        </van-col>
        <van-col span="6" class="center2-col" @click="$router.push('/team')"
          ><img class="center2-col-img" src="@/assets/home/home-center24.png" />
          <div>{{ $t("team.team") }}</div>
        </van-col>
      </van-row>
    </div>
    <div class="center3">
      <van-row style="text-align: center;">
        <van-col span="10"></van-col>
        <van-col span="8">
          <div class="center3-col21">Exclusive for newcomers</div>
          <div class="center3-col22">Click to receive benefits</div>
        </van-col>
        <van-col span="6" class="center3-col3">GO</van-col>
      </van-row>
    </div>
    <div class="product">
      <van-tabs v-model:active="tabIndex" type="card" animated>
        <van-tab v-for="(item, index) in tabList" :key="index + 'tab'">
          <template #title>
            <img
              :src="require('@/assets/home/pro-z' + index + '.png')"
              class="product-card-img"
              v-if="item.id == tabIndex + 1"
            />
            <img
              :src="require('@/assets/home/pro' + index + '.png')"
              class="product-card-img"
              v-else
            />
            <!-- <img src="@/assets/home/fixed.png" class="product-card-img" v-if="item.id == 2" />
              <img src="@/assets/home/pro.png" class="product-card-img" v-if="item.id == 3" /> -->
            {{ $t(item.name) }}
          </template>
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
              <div class="product-container">
                <div
                  class="con1"
                  v-for="(item, index) in listCom"
                  :key="index + 'goods'"
                >
                  <van-row>
                    <van-col span="8">
                      <img class="clo1-img" :src="item.logo" />
                    </van-col>
                    <van-col span="10">
                      <div class="col2-div1">
                        <nobr>{{ item.name }}</nobr>
                      </div>
                      <div class="col2-div2">
                        {{ $t("home.buyPrice") }}:₹{{ item.price }}
                      </div>
                      <div class="col2-div2">
                        {{ $t("home.totalIncome") }}:₹{{ item.allTotal }}
                      </div>
                      <div class="col2-div2">
                        {{ item.days }} {{ $t("home.day") }}
                      </div>
                      <div class="col2-div3">
                        <div>
                          <nobr
                            >{{ $t("home.dayIncome") }}:₹{{
                              item.daily_ratio
                            }}</nobr
                          ><br />
                        </div>
                        <div class="col2-div32">
                          <nobr
                            >{{ $t("home.cumulativeIncome") }}:₹{{
                              item.reward
                            }}</nobr
                          ><br />
                        </div>
                      </div>
                    </van-col>
                    <van-col span="6" class="col3" @click="shouDetail(item)"
                      >purchase</van-col
                    >
                  </van-row>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

    <!--购买窗口-->
    <van-popup v-model="showPop">
      <div class="popup">
        <van-row class="popup1">
          <van-col offset="1" span="10" class="popup1-col"
            >{{ $t("home.dayIncome") }}：₹{{ goodsDetail.daily_ratio }}</van-col
          >
          <van-col offset="2" span="10" class="popup1-col"
            >{{ $t("home.cumulativeIncome") }}：₹{{
              goodsDetail.reward
            }}</van-col
          >
        </van-row>
        <div class="popup2">
          <div class="popup2-left">{{ $t("home.dayOutPut") }}:</div>
          <div class="popup2-right">
            <van-stepper
              v-model="part"
              theme="round"
              button-size="18"
              integer
              min="1"
              :max="goodsDetail.purchaseNum"
            />
          </div>
        </div>
        <div class="popup3">
          <img :src="goodsDetail.logo" class="popup3-img" />
          <!-- <img src="@/assets/home/test.png" class="popup3-img" /> -->
          <div class="popup3-wenzi ml30">
            <div class="wenzi1">
              <nobr>{{ goodsDetail.name }}</nobr>
            </div>
            <div class="wenzi2 mt10">
              {{ $t("home.buyPrice") }}:<span>₹{{ goodsDetail.price }}</span>
            </div>
            <div class="wenzi2 mt10">
              {{ $t("home.totalIncome") }}:<span
                >₹{{ goodsDetail.allTotal }}</span
              >
            </div>
          </div>
        </div>
        <div class="popup-btn" @click="subBuy">{{ $t("home.buyNow") }}</div>
      </div>
      <div class="popup-close">
        <img
          src="@/assets/home/popup-close.png"
          class="popup-close-img"
          @click="closePop"
        />
      </div>
    </van-popup>

    <!--首页弹窗-->
    <van-popup
      v-model:show="show"
      class="home-popup"
      @closed="closeNotice"
      @click-overlay="closeNotice"
      closeable
      :close-icon="require('@/assets/home/home-notice-close.png')"
    >
      <div class="home-popup-bg">
        <div class="home-popup-title">{{ toastInfo.title }}</div>
        <div class="home-popup-text" v-html="toastInfo.text"></div>
      </div>
    </van-popup>

    <div v-if="msg_show" class="kefu" :class="show_kefu ? '' : 'kefu_hide'">
      <!-- <img class="kefu_img" src="@/assets/home/whatsapp.png" />
      <img class="kefu_img" src="@/assets/home/telegram.png"> -->
      <div class="telegram whatsapp">
        <img class="kefu_img" src="@/assets/home/whatsapp.png" />
        <div class="tel-div" @click.stop="kefushow = !kefushow">
          Whatsapp <img class="tel-img" src="@/assets/home/whatsapp-down.png" />
        </div>
      </div>
      <div class="whatsservice" v-show="kefushow">
        <Div class="whatsservice1" @click="kefuclick(kfList[0])"
          >WhatsAPP /service</Div
        >
        <Div class="line"></Div>
        <Div class="whatsservice1" @click="kefuclick(kfList[1])"
          >WhatsApp/groups</Div
        >
      </div>
      <div class="telegram" @click="kefuclick(kfList[2])">
        <img class="kefu_img" src="@/assets/home/telegram.png" />
        <div class="tel-div">Telegram</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHomeInfo, homeSwiperNotice, putBuy } from "@/api/index";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "Home",
  components: {
    swiper,
    swiperSlide,
  },
  filters: {},
  data() {
    return {
      show_kefu: true,
      kefushow: false,
      msg_show: true,
      toastInfo: [],
      show: false,
      showPop: false,
      noticeInfo: [
        {
          id: 1,
          title: "Dear RELX",
          description: "Dear RELX After payment, you need to nce Pleas",
        },
      ],
      swiperOption: {
        effect: "coverflow",
        centeredSlides: true,
        spaceBetween: "6%",
        slidesPerView: "auto",
        loop: true,
        autoplay: true, // 是否自动播放
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
        pagination: {
          // 分页器
          el: ".swiper-pagination",
          type: "bullets",
        },
      },
      tabIndex: 0,
      tabList: [
        {
          name: "home.seedvipProduct",
          id: 1,
        },
        {
          name: "home.seedfixedProduct",
          id: 2,
        },
        {
          name: "home.seedeventProduct",
          id: 3,
        },
      ],
      kfList: [],
      totalInfo: {},
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      page: 1,
      list: [],
      list1: [],
      list2: [],
      part: 1,
      goodsDetail: {},
      znx: 0,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    listCom() {
      return this.tabIndex == 0
        ? this.list1
        : this.tabIndex == 1
        ? this.list
        : this.list2;
    },
  },
  created() {
    this.get_homeSwiper();
    this.get_homeSwiper2();
  },
  mounted() {
    console.log(this.list);
    document.body.addEventListener(
      "scroll",
      function() {
        // if (!that.show_kefu) {
        //   return;
        // }
        // that.show_kefu = false;
      },
      false
    );
    document.addEventListener(
      "click",
      function(ev) {
        if (ev.target.className != "kefu_img") {
          //
        }
      },
      false
    );
  },
  methods: {
    closeNotice() {
      this.$cookie.set("homenotice", 1);
    },
    showPopup() {
      this.show = !this.show;
    },
    get_homeSwiper2() {
      const vm = this;
      homeSwiperNotice({ type: 2 }).then((res) => {
        if (res.code === 1) {
          if (res.data[0]) {
            if (!this.$cookie.get("homenotice")) {
              vm.toastInfo = res.data[0];
              vm.show = true;
            }
            // vm.toastInfo = res.data[0]
            // vm.show = true
          }
        } else {
          vm.$toast(res.msg);
        }
      });
    },
    kefuclick(item) {
      console.log(item);
      window.open(item.url);
    },
    subBuy() {
      let vm = this;
      vm.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      putBuy({ id: vm.goodsDetail.id, number: vm.part }).then((res) => {
        if (res.code == 1) {
          vm.$toast(res.msg);
          vm.showPop = false;
          vm.closePop();
        } else {
          vm.$toast(res.msg);
          // vm.$toast.clear()
          // vm.resultText = res.msg
          vm.showResult = true;
        }
      });
    },
    closePop() {
      // this.showResult = false
      this.showPop = false;
      // this.goodsDetail = {}
      this.part = 1;
    },
    shouDetail(item) {
      if (item.status != 1) {
        this.$toast(this.$t("home.issell"));
        return false;
      }
      if (item.issell == 1) {
        //已售罄
        this.$toast(this.$t("home.issell"));
        return false;
      }
      this.goodsDetail = item;
      this.showPop = true;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      let vm = this;
      getHomeInfo().then(
        (res) => {
          if (vm.refreshing) {
            vm.list = [];
            vm.list1 = [];
            vm.refreshing = false;
          }
          vm.loading = false;
          if (res.code == 1) {
            vm.totalInfo.balance = res.data.balance;
            vm.totalInfo.rechange = res.data.rechange;
            vm.kfList = res.data.kf;
            vm.znx = res.data.znx;
            let list = res.data.pt_product;
            list.forEach((item) => {
              item.allTotal = (
                (item.reward * 100 + item.price * 100) /
                100
              ).toFixed(0);
            });
            vm.list = list;
            let list1 = res.data.vip_product;
            list1.forEach((item) => {
              item.allTotal = (
                (item.reward * 100 + item.price * 100) /
                100
              ).toFixed(0);
            });
            vm.list1 = list1;
            let list2 = res.data.event_mu_list;
            list2.forEach((item) => {
              item.allTotal = (
                (item.reward * 100 + item.price * 100) /
                100
              ).toFixed(0);
            });
            vm.list2 = list2;
            // if(res.data.pages > vm.page){
            //   vm.page++
            // }else{
            vm.finished = true;
            // }
          } else {
            vm.$toast(res.msg);
            vm.error = true;
          }
        },
        () => {
          vm.loading = false;
          vm.error = true;
        }
      );
    },
    get_homeSwiper() {
      const vm = this;
      homeSwiperNotice({ type: 1 }).then((res) => {
        if (res.code === 1) {
          vm.noticeInfo = res.data;
        } else {
          vm.$toast(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.kefu {
  position: fixed;
  z-index: 10;
  left: 13px;
  bottom: 250px;
  transition: all 1s;
  opacity: 1;
  transform: translateX(0);
  z-index: 80;

  .telegram {
    margin: auto;
    width: 172px;
    height: 145px;
    background: #53aeff;
    border: 4px solid #f4f4f4;
    border-radius: 22px;
    text-align: center;
    .kefu_img {
      margin-top: 20px;
      width: 47px;
      height: 48px;
    }
    .tel-div {
      margin-top: 10px;
      font-size: 28px;
      color: #ffffff;
      line-height: 40px;
      .tel-img {
        width: 22px;
        height: 13px;
      }
    }
  }
  .whatsapp {
    background: #2ad150;
  }
  .whatsservice {
    margin-top: -10px;
    width: 212px;
    height: 160px;
    background: #2ad150;
    border: 4px solid #f4f4f4;
    .whatsservice1 {
      font-size: 26px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      color: #ffffff;
      line-height: 35px;
      letter-spacing: -2.08px;
      line-height: 60px;
    }
    .line {
      width: 90%;
      margin: auto;
      background-color: #fff;
      height: 1px;
    }
  }
  // img {
  //   width: 100%;
  //   height: 100%;
  // }
}

.kefu_hide {
  transform: translateX(70%);
  opacity: 0.5;
}

.home-container {
  // background: url("~assets/home/home-bg.png") no-repeat;
  // background-size: 100% 100%;
  background-color: #f0f4fe;
  // z-index: -3;
  height: auto;
  margin-bottom: 100px;

  .home-top {
    background: url("~assets/home/home-top.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 415px;
    position: relative;
    z-index: 1;

    .home-top-img {
      position: absolute;
      width: 385px;
      height: 398px;
      right: 0;
      top: 0;
      z-index: 2;
    }

    .Profession {
      padding-top: 70px;
      padding-left: 50px;
      font-size: 50px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      color: #f2f5fc;
      line-height: 50px;
    }

    .becomes {
      padding-left: 50px;
      font-size: 40px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      color: #f2f5fc;
      line-height: 62px;
    }

    .invest {
      padding-left: 50px;
      font-size: 32px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      color: #f2f5fc;
      line-height: 62px;
    }
  }

  .home-notice-text {
    position: relative;
    z-index: 2;
    margin-top: -55px;
    height: 100px;

    .notice-swipe {
      height: 40px;
      line-height: 40px;
    }
  }

  .center1 {
    width: 95%;
    margin: auto;
    height: 254px;
    background: #ffffff;
    border-radius: 40px;
    box-shadow: -0.28px 3.99px 30px 4px rgba(165, 188, 251, 0.4);

    .col1 {
      background: url("~assets/home/home-center1.png") no-repeat;
      background-size: 100% 100%;
      width: 45%;
      margin-left: 20px;
      margin-top: 30px;
      height: 188px;

      .col11 {
        width: 75px;
        height: 75px;
        background: linear-gradient(22deg, #ff947c 0%, #ffb98c 100%);
        border-radius: 50%;
        text-align: center;
        margin-top: 20px;
        margin-left: 10px;

        .col11-img {
          margin-top: 15px;
          width: 36px;
          height: 39px;
        }
      }

      .col12 {
        margin-top: 10px;
        margin-left: 10px;

        .col12-div1 {
          font-size: 37px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: bold;
          color: #ff977c;
          line-height: 49px;
          letter-spacing: -2.93px;
        }

        .col12-div2 {
          font-size: 26px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #fcae99;
          line-height: 40px;
          letter-spacing: -0.52px;
        }
      }

      .col2 {
        margin-top: 5px;
        float: right;
        margin-right: 20px;
        width: 194px;
        height: 70px;
        background: #fbe5db;
        border: 4px solid #fcefec;
        border-radius: 100%;
        text-align: center;
        line-height: 70px;
        font-size: 26px;
        color: #fcae99;
      }
    }
  }

  .center2 {
    width: 95%;
    margin: 20px auto;
    height: 214px;
    background: #ffffff;
    border-radius: 40px;
    box-shadow: -0.28px 3.99px 30px 4px rgba(165, 188, 251, 0.4);

    .center2-col {
      margin-top: 30px;
      height: 214px;

      .center2-col-img {
        width: 105px;
        height: 110px;
      }
    }
  }

  .center3 {
    background: url("~assets/home/home-center3.png") no-repeat;
    background-size: 100% 100%;
    width: 99%;
    margin: auto;
    height: 207px;

    .center3-col21 {
      margin-top: 30px;
      font-size: 32px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: bold;
      color: #fd8247;
      line-height: 43px;
    }

    .center3-col22 {
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: bold;
      text-decoration: underline;
      color: #fdfcfb;
      line-height: 43px;
    }

    .center3-col3 {
      font-size: 40px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #ffe4ed;
      line-height: 180px;
    }
  }

  .product {
    position: relative;
    z-index: 2;
    margin-top: 20px;

    .product-card-img {
      width: 37px;
      height: 36px;
      margin-right: 10px;
      vertical-align: middle;
    }

    .product-container {
      .con1 {
        width: 95%;
        margin: 20px auto;
        height: 254px;
        background: #ffffff;
        border-radius: 40px;
        box-shadow: -0.28px 3.99px 30px 4px rgba(165, 188, 251, 0.4);

        .clo1-img {
          margin-top: 30px;
          margin-left: 20px;
          width: 169px;
          height: 159px;
          border-radius: 20px;
        }

        .col3 {
          margin-top: 40px;
          text-align: center;
          border-radius: 50%;
          width: 130px;
          height: 130px;
          line-height: 120px;
          border: 2px solid #00d0f6;
          font-size: 25px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;

          color: #fc755b;
        }

        .col2-div1 {
          margin-top: 30px;
          font-size: 25px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
        }

        .col2-div2 {
          margin-top: 20px;
          font-size: 21px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
        }

        .col2-div3 {
          margin-top: 20px;
          display: flex;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #fc755b;

          .col2-div32 {
            margin-left: 20px;
          }
        }
      }
    }
  }

  .popup {
    background: url("~assets/home/popup-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 558px;
    height: 609px;
    border-radius: 28px;

    .popup1 {
      padding-top: 60px;
      text-align: center;

      .popup1-col {
        height: 80px;
        border: 2px solid #ffe6c8;
        border-radius: 16px;
        line-height: 80px;
        color: #ffe6c8;
      }
    }

    .popup2 {
      padding-top: 20px;
      display: flex;
      align-items: center;
      color: #ffe6c8;

      .popup2-left {
        margin-left: 80px;
      }

      .popup2-right {
        margin-left: 140px;
      }
    }

    .popup3 {
      margin-left: 50px;
      margin-top: 50px;
      display: flex;

      .popup3-img {
        margin-top: 10px;
        margin-left: 10px;
        width: 157px;
        height: 157px;
      }

      .popup3-wenzi {
        margin-top: 10px;

        .wenzi1 {
          margin-top: 20px;
          font-size: 30px;
          font-family: Kozuka Gothic Pr6N, Kozuka Gothic Pr6N-R;
          font-weight: normal;
          text-align: left;
          color: #cc1127;
        }

        .wenzi2 {
          margin-top: 20px;
          font-size: 23px;
          font-family: PingFang, PingFang-SC-Regular;
          font-weight: normal;
          text-align: left;
          color: #676767;

          span {
            font-size: 28px;
            font-family: PingFang, PingFang-SC-Regular;
            font-weight: normal;
            text-align: left;
            color: #000000;
          }
        }
      }
    }

    .popup-btn {
      width: 60%;
      margin: auto;
      margin-top: 70px;
      text-align: center;
      height: 88px;
      line-height: 88px;
      background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%);
      border-radius: 44px;
      font-size: 39px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      text-align: center;
      color: #f4e1c5;
      line-height: 83px;
      letter-spacing: 3.11px;
      text-shadow: -1px 0px 6px 1px #b92926;
    }
  }

  .popup-close {
    text-align: center;
    margin-top: 20px;

    .popup-close-img {
      width: 57px;
      height: 59px;
    }
  }

  .home-popup {
    .home-popup-bg {
      background: url("~assets/home/ag.png") no-repeat;
      background-size: 100% 100%;
      padding: 20px 0px;
      width: 616px;
      min-height: 732px;
      overflow: auto;

      .home-popup-title {
        padding-top: 150px;
        font-size: 34px;
        font-family: Adobe Heiti Std, Adobe Heiti Std-R;
        font-weight: normal;
        text-align: center;
        color: #ffffff;
      }

      .home-popup-text {
        width: 80%;
        margin: auto;
        font-size: 20px;
        color: #ffffff;
        text-align: left;
      }
    }
  }
}
</style>
<style lang="less">
.home-container {
  .van-stepper--round .van-stepper__plus {
    background-color: transparent;
    border: 1px solid #fff;
  }

  .van-stepper--round .van-stepper__minus {
    color: #fff;
    background-color: transparent;
    border: 1px solid #fff;
  }

  .van-popup {
    background-color: transparent;
  }

  .van-notice-bar {
    border-radius: 50px;
  }

  .van-tabs--card > .van-tabs__wrap {
    height: auto;
  }

  .van-tabs__nav--card .van-tab.van-tab--active {
    height: 69px;
    background-color: #00d0f6;
    color: #fff;
    border-radius: 15px;
  }

  .van-tabs__nav--card {
    border: 0px;
    height: auto;
    background-color: transparent;
  }

  .van-tabs__nav--card .van-tab {
    border-right: 0px;
    color: #999999;
  }
}
</style>
