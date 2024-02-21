<template>
  <div class="xm-company-concact-us-page">
    <XmHeader/>
    <ContactUs/>
    <XmFooter/>
  </div>
</template>

<script>
import XmHeader from '../components/Header/index.vue'
import ContactUs from '../components/ContactUs/index.vue'
import XmFooter from '../components/Footer/index.vue'

export default {
  components: {
    XmHeader,
    ContactUs,
    XmFooter
  },
  head: {
    title: 'CONTACT US'
  }
}
</script>

<style lang="scss">
  .xm-company-concact-us-page {
    overflow: hidden;
    .amap-geolocation-con {
      display: none;
    }
  }
</style>
