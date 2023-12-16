export const inputVerify = {
  methods: {
    formatter(value) {
      return value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im, '')
    },
    formatterPwd(value) {
      // 过滤输入的数字
      return value.replace(/\D/g, '')
    }
  }
}

export const loginForm = {
  methods:{
    formatterPwd(value) {
      // 过滤特殊字符
      return value.replace(/[`~!@#$%^&*()\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im, '')
    },
    formatterNum(value) {
      // 过滤输入的数字
      return value.replace(/\D/g, '')
    },
    // 验证
    accountValidator(value) {
      if (value === '') {
        this.$toast(this.$t('common.accountToast'))
        return false
      }else {
        return true
      }
    },
    // 验证
    pwdValidator(value) {
      console.log(value)
      if (!this.$valid.isValidPassGroup(value)) {
        this.$toast(this.$t('common.passPwdToast'))
        return false
      } else {
        return true
      }
    },
    pwdValidatorT(value){
      if(this.password != value){
        this.$toast(this.$t('common.passPwdToastT'))
        return false
      }else{
        return true
      }
    },
    payValidator(value){
      if(value.length != 6){
        this.$toast(this.$t('common.payPwdToast'))
        return false
      }else{
        return true
      }
    },
    ifscValidator(value){
      if(value.length != 11){
        this.$toast(this.$t('mine.ifsc'))
        return false
      }else{
        return true
      }
    },
    payValidatorT(value){
      if(value != this.paypass){
        this.$toast(this.$t('common.payPwdToastT'))
        return false
      }else{
        return true
      }
    }
  }
}
