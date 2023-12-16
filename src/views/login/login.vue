<template>
  <div class="login-container">
    <div class="login-a"></div>
    <div class="login-bg">
      <div class="login-logo">Welcome!</div>
      <div class="login-form">
        <van-form @submit="onSubmit" validate-first :validate-trigger="'onSubmit'" :show-error-message="false">
          <van-field v-model="account" label="+91" name="phone" :placeholder="$t('login.seedplaMobil')" type="number"
            maxlength='20' />
          <div class="line"></div>
          <van-field class="password-field mt30" v-model="password" name="password"
            :placeholder="$t('login.seedplaPass')" type="password" maxlength='20' />
          <div class="line"></div>
          <div class="buttons mt20">
            <div class="button1" @click="$router.push('/register')">{{ $t('login.seedRegister') }}</div>
            <div class="button2" @click="$router.push('/setpwd')">{{ $t('login.seedforgetPwd') }}？</div>
          </div>

          <van-button class="login-btn mt50" round block @click="onSubmit" type="info" native-type="submit"
            :disabled="password == '' || account == '' ? true : false"
            :class="password == '' || account == '' ? 'is_disabled_btn' : ''">{{ $t('login.signIn') }}</van-button>
          <div class="download mt20" @click="$router.push('/downloadApp')">{{ $t('login.seeddownLoad') }}</div>
        </van-form>
      </div>
    </div>
    <img class="bottom-bg" src="@/assets/login/login-bottom.png" />
  </div>
</template>
<script>
import { loginForm } from '@/utils/mixins'
import { userLogin } from '@/api/login'
export default {
  name: 'Login',
  mixins: [loginForm],
  data() {
    return {
      account: '',
      password: ''
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    onSubmit(values) {
      let vm = this
      vm.$toast.loading({ duration: 0, message: vm.$t('login.loginIn') + '…' })
      let data = {
        phone: vm.account,
        password: vm.$md5(vm.password),
      }
      userLogin(data).then((res) => {
        if (res.code == 1) {
          vm.$toast.clear()
          vm.$cookie.set('tokenSP', res.data.token)
          vm.$cookie.set('userInfoSP', vm.$AES.encrypt(JSON.stringify(res.data)))
          vm.$router.replace('hIndex')
        } else {
          vm.$toast(res.msg)
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.login-container {
  background: url("~assets/login/login-bg.png") no-repeat;
  background-size: 100% 100%;
  min-height: 100%;

  .login-a {
    height: 40px;
  }

  .login-bg {
    // background-color: rgb(255, 255, 255,0.6);
    background: rgba(222, 222, 221, 0.5);
    // background-color: #FFF;
    height: 80%;
    width: 80%;
    margin: auto;
    margin-top: 100px;
    // opacity: 0.6;
    position: relative;
  }
  .bottom-bg{
    position: absolute;
    right: 0;
    bottom: 20px;
    width: 398px;
    height: 314px;
  }

  .login-logo {
    padding-top: 300px;
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
      background-color: #ff9a7f;
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
    .download{
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
.login-container {
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