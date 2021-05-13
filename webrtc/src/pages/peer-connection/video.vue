<template>
  <video ref="video" autoplay playsinline></video>
</template>

<script>
  export default {
    computed: {
      video() {
        return this.$refs.video
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$emit('mounted', this.$refs.video)
      })
    }
  }
</script>

<style lang="scss">
</style>
