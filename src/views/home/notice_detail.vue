<template>
  <div class="container notice-detail">
    <div class="detail-div div-sizing">
      <div class="detail-padding div-sizing">
        <div class="detail-title">{{info.title}}</div>
        <div class="detail-time">{{info.time}}</div>
        <div
          class="detail-content"
          v-html="info.content"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeDetail } from '@/api/index'
export default {
  data() {
    return {
      id: '',
      info: { content: '' }
    }
  },
  created() {
    if (this.$route.query.i) {
      this.id = this.$AES.decrypt(this.$route.query.i)
      this.getInfo()
    } else {
      this.$toast(this.$t('common.common'))
      this.$router.go(-1)
    }
  },
  methods: {
    getInfo() {
      let vm = this
      getNoticeDetail({ id: vm.id }).then(res => {
        if (res.code == 1) {
          vm.info = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.notice-detail {
  padding-top: 1rem;
  .detail-div {
    flex: 1;
    padding: 36px 30px 30px;
  }
  .detail-padding {
    height: 100%;
    padding: 20px 30px;
    .detail-title {
      margin-bottom: 24px;
      font-size: 32px;
      color: #333333;
    }
    .detail-time {
      margin-bottom: 60px;
      color: #989898;
      font-size: 20px;
    }
    .detail-content {
      color: #a5a5a5;
      font-size: 26px;
    }
  }
}
</style>