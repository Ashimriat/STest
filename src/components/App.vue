<template lang="pug">
  div.wrapper
    div.main
      div.ratesContainer
        ExchangeRates
      div.queuesContainer
        CouponQueue
      div.videoContainer
        Video
</template>

<script>
  import Vue from 'vue';
  import ExchangeRates from './ExchangeRates';
  import Video from './Video';
  import CouponQueue from './CouponQueue';


  export const eventBus = new Vue();
  export default {
    name: 'App',
    components: { ExchangeRates, Video, CouponQueue },
    mounted() {
      this.$store.dispatch('INIT_SOCKET');
    }
  }
</script>

<style lang="sass">
  .wrapper
    display: flex
    justify-content: center
    align-items: center
  .main
    display: flex
    width: 90vw
    height: 100vh
    flex-wrap: wrap
  .ratesContainer
    flex-basis: 50%
    height: 40vh
  .queuesContainer
    flex-basis: 50%
    height: 40vh
  .videoContainer
    flex-basis: 100%
    height: 60vh
    display: flex
    justify-content: center
    align-items: center
</style>
