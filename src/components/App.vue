<template lang="pug">
  div.wrapper
    div.main(
      :class=`{
        'main--1module': modules.length === 1,
        'main--2modules': modules.length === 2,
        'main--3modules': modules.length === 3,
      }`
    )
      div.videoContainer.areaA(
        v-if="modules.includes('video')"
      )
        Video
      div.couponsContainer(
        v-if="modules.includes('coupons')"
        :modulesAmount="modules.length"
        :class=`{
          'areaA': modules.length === 1,
          'areaB': modules.length === 2 || modules.length === 3
        }`
      )
        CouponQueue
      div.ratesContainer(
        v-if="modules.includes('rates')"
        :modulesAmount="modules.length"
        :class=`{
          'areaA': modules.length === 1 || (modules.length === 2 && modules.includes('coupons')),
          'areaB': modules.length === 2 && !modules.includes('coupons'),
          'areaC': modules.length === 3
        }`
      )
        ExchangeRates
</template>

<script>
  import Vue from 'vue';
  import ExchangeRates from './ExchangeRates';
  import Video from './Video';
  import CouponQueue from './CouponsQueue';


  export const eventBus = new Vue();
  export default {
    name: 'App',
    components: { ExchangeRates, Video, CouponQueue },
    data() {
      return {
        modules: ['video', 'rates']
      }
    },
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
    display: grid
    width: 100vw
    height: 100vh
    &--1module
      grid-template: 'a'
    &--2modules
      grid-template: 'a b'
      grid-template-columns: 30vw 70vw
      @media (max-width: 1080px)
        grid-template: 'a' 'b'
        grid-template-rows: 30vh 70vh
    &--3modules
      grid-template: 'a b' 'c b'
      grid-template-columns: 65vw 35vw
      grid-template-rows: 65vh 35vh
  .areaA
    grid-area: a
  .areaB
    grid-area: b
  .areaC
    grid-area: c
  .couponsContainer
    background-color: #181c18
    & > *
      font-family: sans-serif
      color: #ffffff
</style>
