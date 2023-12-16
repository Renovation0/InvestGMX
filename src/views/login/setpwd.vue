<template>
  <div class="forget-container">
    <div class="forget-bg">
      <van-form @submit="onSubmit" validate-first :validate-trigger="'onSubmit'" :show-error-message="false">
        <div class="pt50"> </div>
        <van-field class="form-field" v-model="account" name="phone" label="+91"
          :left-icon="require('@/assets/login/user.png')" :placeholder="$t('login.seedplaMobil')" type="tel"
          maxlength='20' />
        <div class="pt50"> </div>
        <van-field class="form-field" v-model="code" name="code" :placeholder="$t('login.pcaptcha')" type="digit"
          maxlength='20' :left-icon="require('@/assets/login/yzm.png')">
          <template #button>
            <div v-if="time == ''" class="getcaptcha" @click="sendSMS">{{ $t('login.sendCode') }}</div>
            <div v-else class="getcaptcha">{{ time }}s</div>
          </template>
        </van-field>
        <div class="pt50"> </div>
        <van-field class="form-field" v-model="password" name="password" :placeholder="$t('login.newpassword')"
          type="password" maxlength='20' :left-icon="require('@/assets/login/password.png')" />
        <div class="pt50"> </div>
        <van-field class="form-field" v-model="verifyPwd" :placeholder="$t('login.comPwd')" type="password"
          maxlength='20' :left-icon="require('@/assets/login/password.png')"
          :rules="[{ validator: pwdValidatorT, message: '' }]" />
        <div>
          <van-button class="forget-btn mt100" round block @click="onSubmit" type="info" native-type="submit"
            :disabled="password == '' || account == '' || verifyPwd == '' ? true : false"
            :class="password == '' || account == '' || verifyPwd == '' ? 'is_disabled_btn' : ''">{{ $t('login.confirm') }}</van-button>
          <van-button class="forget-btn mt30"  style="border: #ff947c 1px solid; color: #ff947c;" native-type="button" round block
            @click="$router.push('/login')">{{ $t('login.havecount') }}</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { loginForm } from '@/utils/mixins'
import { resetPassword, userCodeRegister } from '@/api/login'
export default {
  name: 'Login',
  mixins: [loginForm],
  data() {
    return {
      account: '',
      password: '',
      code: '',
      verifyPwd: '',
      time: '',
      setInt: null,
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    onSubmit(values) {
      let vm = this
      values.password = vm.$md5(values.password)
      vm.$toast.loading({ duration: 0, message: vm.$t('login.changing') + '…' })
      resetPassword(values).then(res => {
        if (res.code == 1) {
          vm.$toast(res.msg)
          setTimeout(() => {
            vm.$router.replace('/login')
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
.forget-container {
  background: url("~assets/login/forget-bg.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  padding-top: 2rem;

  .forget-bg {
    width: 80%;
    height: 1000px;
    background: #FFF;
    margin: auto;
    border-radius: 30px;

    .form-field {
      width: 90%;
      margin: auto;
    }
    .forget-btn{
      width: 80%;
      margin: auto;
      margin-top: 40px;
    }
  }
}
</style>
<style lang="less" >
.forget-container {
  .van-cell {
    border-radius: 42px;
    background-color: #FFF;
    border: #ff947c 1px solid;
  }
  .van-button--info{
    background:#ff947c;
    border: #ff947c;
  }
  .van-field__label {
    text-align: center;
    width: 100px;
    opacity: 0.48;
    background:#ff947c;
    border-radius: 22px;
    color: #FFF;
  }

  input {
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #ff947c;
      font-size: 26px;
      font-family: PingFang SC, PingFang SC-Light;
      font-weight: 300;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #ff947c;
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #ff947c;
    }
  }
}
</style>
