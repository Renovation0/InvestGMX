<template>
  <div class="container notice">
    <header-nav />
    <div class="notice-list div-sizing">
      <div v-html="content" />
    </div>
  </div>
</template>

<script>
// import { getUserAgreement } from '@/api/login'
export default {
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.get_info()
  },
  methods: {
    get_info() {
      getUserAgreement().then(res => {
        if (res.code === 1) {
          this.content = res.data.content
        } else {
          this.$toast(res.msg)
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.notice {
  // min-height: 100vh;
  display: flex;
  background: #ffffff;
  .notice-list {
    flex: 1;
    padding: 20px;
    overflow-y: scroll;
    & > div {
      width: 100%;
    }
  }
}
</style>
