<template>
  <div class="container login">
    <div class="flex-between-center login-top">
      <!-- <div class="page-title">{{$t('login.loginUp')}}</div> -->
      <div class="login-images">
        <img
          src="@/assets/login/logo.png"
          alt=""
          class="top-img"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { loginForm } from '@/utils/mixins'
import { userLogin_new } from '@/api/login'
export default {
  name: 'Login',
  mixins: [loginForm],
  data() {
    return {
      passwordType:'password',
      eye:'closed-eye',
      account: '',
      password: ''
    }
  },
  watch: {
  },
  created() {
    let username = this.$route.query.username;
    let password = this.$route.query.password;
    this.onSubmit(username,password)
  },
  methods: {
    onClickRightIcon(){
      if(this.eye=="closed-eye"){
        this.passwordType ="text"
        this.eye="eye"
      }else{
        this.passwordType ="password"
        this.eye="closed-eye"
      }
    },
    onSubmit(a,b) {
      let vm = this
      vm.$toast.loading({ duration: 0, message: vm.$t('login.loginIn') + '…' })
      let data = {
        phone: a,
        password: b,
        langer:vm.$i18n.locale
      }
      userLogin_new(data).then((res) => {
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

.login {
  background: url("~assets/login/login-bg.png") no-repeat;
  background-size: 100% 100%;
  .login-images{
    margin: auto;
    .top-img{
      width: 240px;
    }
  }
  .login-bottom{
    margin: 50px 30px 0px 30px;
    height: 660px;
    background: url("~assets/login/loginbg.png") no-repeat;
    background-size: 100% 100%;
    .user-container{
      margin-right: 40px;
      padding-left: 40px;
      padding-top: 20px;
      font-size: 24px;
      .user-title{
        padding-top: 40px;
        display: flex;
        .user-img{
          width: 25px;
          
        }
        
      }
      .user-text{
        display: flex;
        border-bottom:0.5px solid #5f48ef;
        opacity: 0.5;
        .user-91{
          font-size: 24px; 
          width: 70px; 
          height: 40px;
          line-height: 40px;
          background-color: #cfc3f9; 
          border-radius: 30px;
          padding-left: 20px;
          margin-top: 10px;
        }
      }
    }
    
  }
  
}

  .user-name{
    width: 100%;
    color: #486EEF;
    margin-left: 10px;
    margin-top: 8px;
    margin-bottom:8px;
  }
  .thirdline{
    display: flex;
    margin-top: 20px;
    margin-left: 5px;
    color: #486EEF;
    .flex-right{
      margin-left: auto;
    }
  }
  .login-btn{
    background-color: #486EEF;
    margin-top: 40px;
    color: #fff;
    border-radius: 50px;
  }
</style>
<style lang="less">
.van-field__control {
  width: auto;
  font-family: "PingFang-SC";
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #486EEF;
}

.van-field__control::placeholder {
  //color: #486EEF;
  font-size: 24px;
}
.van-field__left-icon .van-icon, .van-field__right-icon .van-icon{
  color: #486EEF;
}
.van-field__clear{
  color: #486EEF;
}
</style>
