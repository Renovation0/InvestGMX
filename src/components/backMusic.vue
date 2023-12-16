<template>
  <div class="">
    <audio ref="bgMusic" src="@/assets/mp3/bgmusic.mp3" :loop="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      play: false
    }
  },
  watch: {
    '$store.state.play'() {
      this.play = this.$store.state.play
      this.changeMusic()
    }
  },
  mounted() {
    this.play = this.$store.state.play
    this.changeMusic()
  },
  methods: {
    changeMusic() {
      if (this.play) {
        this.$refs.bgMusic.play()
      } else {
        this.$refs.bgMusic.pause()
      }
    }
  }
}
</script>

<style lang="less">

</style>
