<template>
  <div class="container company-introduction">
    <div class="company-padding">
      <div
        class="company-content"
        v-html="content"
      />
    </div>
  </div>
</template>

<script>
import { getHomeInfo } from '@/api/index'
export default {
  name: 'WorkspaceJsonCompanyIntroduction',

  data() {
    return {
      content: ''
    };
  },
  created() {
    this.onLoad()
  },
  mounted() {

  },

  methods: {
    onLoad() {
      let vm = this
      getHomeInfo().then(res => {
        if (res.code == 1) {
          vm.content = res.data.company.content
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.company-introduction {
  background: #e8f2fc;
  .company-padding {
    padding: 30px;
  }
  .company-content {
    width: 100%;
    font-size: 30px;
    color: #323232;
  }
}
</style>