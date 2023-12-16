<template>
  <div class="register-container">
    <div class="login-a"></div>
    <div class="login-bg">
      <div class="login-logo">Welcome!</div>
      <div class="login-form">
        <van-form @submit="onSubmit" validate-first :validate-trigger="'onSubmit'" :show-error-message="false">
          <van-field v-model="account" label="+91" name="phone" :placeholder="$t('login.seedplaMobil')" type="number"
            :rules="[{ validator: accountValidator, message: '' }]" maxlength='20' />
          <div class="line"></div>
          <van-field class="padleft mt10" v-model="code" name="code" :placeholder="$t('login.pcaptcha')" type="digit"
            maxlength='20'>
            <template #button>
              <div v-if="time == ''" class="getcaptcha" @click="sendSMS">{{ $t('login.sendCode') }}</div>
              <div v-else class="getcaptcha">{{ time }}s</div>
            </template>
          </van-field>
          <div class="line"></div>

          <van-field class="padleft mt10" v-model="password" name="password" :placeholder="$t('login.password')"
            type="password" maxlength='20' />
          <div class="line"></div>
          <van-field class="padleft mt10" v-model="verifyPwd" :placeholder="$t('login.comPwd')" type="password"
            maxlength='20' :rules="[{ validator: pwdValidatorT, message: '' }]" />
          <div class="line"></div>
          <van-field class="padleft mt10" v-model="guid" name="guid" :placeholder="$t('login.inviCode')" maxlength='20' />
          <div class="line"></div>
          <div class="buttons mt20">
            <div class="button1" @click="$router.push('/login')">{{ $t('login.signIn') }}</div>
            <div class="button2" @click="$router.push('/setpwd')">{{ $t('login.seedforgetPwd') }}？</div>
          </div>
          <van-button class="login-btn mt50" round block  type="info" native-type="submit">{{ $t('login.seedRegister') }}</van-button>
          <div class="download mt20" @click="$router.push('/downloadApp')">{{ $t('login.seeddownLoad') }}</div>
        </van-form>
      </div>
    </div>
    <img class="bottom-bg" src="@/assets/login/login-bottom.png" />
  </div>
</template>
<script>
import { loginForm } from '@/utils/mixins'
import { userRegister, userCodeRegister } from '@/api/login'
export default {
  name: 'Login',
  mixins: [loginForm],
  data() {
    return {
      code: '',//验证码
      guid: '',//邀请码
      account: '',
      password: '',
      verifyPwd: '',
      time: '',//发送验证码倒计时
      setInt: null,
    }
  },
  watch: {
  },
  created(options) {
    let guid = this.$route.query.code;
    this.guid = guid ? guid : "";
    if (this.guid) {
      this.formChrome = true;
    } else {
      this.formChrome = false;
    }
  },
  methods: {
    onSubmit() {
      let vm = this

      let data = {
        phone: vm.account,
        code: vm.code,
        password: vm.$md5(vm.password),
        guid: vm.guid
      }
      vm.$toast.loading({ duration: 0, message: vm.$t('login.inRegister') + '…' })
      userRegister(data).then(res => {
        if (res.code == 1) {
          vm.$toast(res.msg)
          setTimeout(() => {
            // vm.$router.replace('/login')
            if (vm.formChrome) {
              vm.$router.replace("/downloadApp");
            } else {
              vm.$router.replace("/login");
            }
          }, 1000)
        } else {
          vm.$toast(res.msg)
        }
      })
    },
    sendSMS() {
      let vm = this
      if (vm.account == '') {
        vm.$toast(vm.$t('login.phoneToast'))
      } else {
        vm.$toast.loading({ duration: 0, message: vm.$t('login.sendProgress') + '…' })
        userCodeRegister({ phone: vm.account }).then(res => {
          if (res.code == 1) {
            vm.$toast(vm.$t('login.sendSuccess'))
            vm.time = 60
            vm.setInt = setInterval(() => {
              if (vm.time > 0) {
                vm.time--
              } else {
                vm.time = ''
                clearInterval(vm.setInt)
                vm.setInt = null
              }
            }, 1000)
          } else {
            vm.$toast(res.msg)
          }
        })
      }
    },
  }
}
</script>
<style lang="less" scoped>
.register-container {
  background: url("~assets/login/login-bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  min-height: 100%;

  .login-a {
    height: 40px;
  }

  .login-bg {
    // background-color: rgb(255, 255, 255,0.6);
    background: rgba(222, 222, 221, 0.5);
    // background-color: #FFF;
    height: 1000px;
    width: 80%;
    margin: auto;
    margin-top: 100px;
    // opacity: 0.6;
    position: relative;
  }

  .bottom-bg {
    position: absolute;
    right: 0;
    bottom: 20px;
    width: 398px;
    height: 314px;
  }

  .login-logo {
    padding-top: 80px;
    margin-left: 150px;
    font-size: 48px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: bold;
    text-align: left;
    color: #1f1f1f;
    line-height: 79px;
  }

  .login-form {
    width: 65%;
    margin: auto;

    .line {
      background-color: #FFF;
      height: 1px;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .button1 {
        font-size: 24px;
        font-family: Adobe Heiti Std, Adobe Heiti Std-R;
        font-weight: normal;
        text-decoration: underline;
        text-align: left;
        color: #666666;
        line-height: 50px;
        letter-spacing: 1.2px;
      }

      .button2 {

        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #00d1cb;
        line-height: 50px;
        letter-spacing: 1.2px;
      }
    }

    .login-btn {
      width: 50%;
      height: 80px;
      background: #ff947c;
      border-radius: 40px;
    }

    .download {
      width: 50%;
      text-align: center;


      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-decoration: underline;

      color: #ff947c;
      line-height: 50px;
      letter-spacing: 1.2px;
    }
  }
}
</style>
<style lang="less">
.register-container {
  .van-cell {
    background-color: transparent;
    border: 0px 3px;
  }
  .van-button--info {
    border: 1px solid #ff947c;
  }
  .van-field__label {
    width: auto;
  }

  input {
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #333333;
      font-size: 26px;
      font-family: PingFang SC, PingFang SC-Light;
      font-weight: 300;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #333333;
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #333333;
    }
  }
}
</style>
