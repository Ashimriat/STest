<template lang="pug">
  Fragment
    div.queue__noCoupons(v-if="!COUPONS.length")
      | В настоящий момент в очереди нет талонов
    div.queueMain(v-if="COUPONS.length")
      div.queueHead
        div
          | Номер талона
        div
          | Тип
        div
          | Окно
        div
          | Дата
      div.coupons(:class="{'coupons__overflow': COUPONS.length > 6}")
        Fragment(
          v-for="coupon in COUPONS"
          :key="`${coupon.code}-${coupon.type}`"
        )
          div
            | {{ coupon.code }}
          div
            | {{ coupon.type }}
          div
            | {{ coupon.window }}
          div
            | {{ coupon.date }}
</template>

<script>
  import { Fragment } from 'vue-fragment'


  export default {
    name: 'CouponQueue',
    components: { Fragment },
    computed: {
      COUPONS() {
        return this.$store.getters.COUPONS.filter(coupon => coupon.status === 1)
      }
    }
  }
</script>

<style lang="sass">
  .queue__noCoupons
    display: flex
    justify-content: center
    align-items: center
    font-size: 26px
    font-weight: 600
    height: 100%
  .queueMain
    width: 90%
    height: 100%
  .queueHead
    background-color: #ededed
    border: 1px solid #000000
    display: flex
    height: 50px
    & > div
      display: flex
      justify-content: center
      align-items: center
      font-size: 16px
      font-weight: 600
      flex-basis: 194px
      &:not(:last-child)
        border-right: 1px solid #000000
  .coupons
    max-height: calc(100% - 50px)
    overflow: auto
    display: grid
    border-left: 1px solid #000000
    grid-template-columns: 194px 194px 194px 195px
    &__overflow
      grid-template-columns: 194px 194px 194px 175px
    & > div
      display: flex
      justify-content: center
      align-items: center
      height: 50px
      border-right: 1px solid #000000
      border-bottom: 1px solid #000000
</style>
