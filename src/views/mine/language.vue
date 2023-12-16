<template>
  <div class="language">
    <div class="language-list">
      <div
        class="language-item"
        v-for="item in languageList"
        :key="item.locale"
        @click="changeLan(item)"
      >
        <div class="language-title">{{item.title}}</div>
        <van-icon
          name="success"
          v-show="$i18n.locale == item.locale"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { putEditLanguage } from '@/api/mine'
export default {
  data() {
    return {
      languageList: [
      //   {
      //   title: '中文',
      //   locale: 'ZH'
      // },
      {
        title: 'English',
        locale: 'EN'
      }, {
        title: 'हिन्दी',
        locale: 'IN'
      },]
    }
  },
  methods: {
    changeLan(item) {
      let vm = this
      if (vm.$i18n.locale != item.locale) {
        vm.$toast.loading({
          duration: 0,
        })
        putEditLanguage({ lange: item.locale }).then(res => {
          if (res.code == 1) {
            vm.$toast.clear()
            vm.$cookie.set('languageSPG', item.locale)
            vm.$i18n.locale = item.locale
            vm.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.language {
  margin-top: 1rem;
  background: #FFF;
  .language-list {
    padding: 40px 30px;
    .language-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      border-bottom: 2px solid rgba(#999999, 0.2);
    }
    .van-icon {
      color: #42796f;
      font-size: 36px;
    }
  }
}
</style>