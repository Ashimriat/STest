<template lang="pug">
  Fragment
    div.CouponsQueue__noCoupons(v-if="!COUPONS.length")
      | В настоящий момент в очереди нет талонов
    div.CouponsQueue__main(v-if="COUPONS.length")
      div.CouponsQueue__couponsList(
        v-if="COUPONS_WINDOW.length"
        :class="{'coupons__overflow': COUPONS_WINDOW.length > 6}"
      )
        Coupon(
          v-for="coupon in COUPONS_WINDOW"
          :key="`${coupon.code}-${coupon.type}-${coupon.area}`"
          :code="coupon.code"
          :type="coupon.type"
          :status="coupon.status"
          :area="coupon.area"
        )
      div.CouponsQueue__queueContainer(
        :class="{'CouponsQueue__queueContainer--hidden': modulesAmount === 3}"
        v-if="COUPONS_WINDOWLESS.length"
      )
        div.CouponsQueue__queueTitle
          | В очереди
        div.CouponsQueue__queueCouponsList
          Coupon(
            v-for="coupon in COUPONS_WINDOWLESS"
            :key="`${coupon.code}-${coupon.type}-${coupon.area}`"
            :code="coupon.code"
            :type="coupon.type"
            :status="coupon.status"
          )
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import Coupon from './Coupon';


  export default {
    name: 'CouponQueue',
    components: { Fragment, Coupon },
    props: ['modulesAmount'],
    computed: {
      COUPONS() {
        return this.$store.getters.COUPONS;
      },
      COUPONS_WINDOW() {
        return this.$store.getters.COUPONS.filter(coupon => Boolean(coupon.area))
      },
      COUPONS_WINDOWLESS() {
        return this.$store.getters.COUPONS.filter(coupon => !Boolean(coupon.area))
      }
    }
  }
</script>

<style lang="sass">
  .CouponsQueue
    &__noCoupons
      display: flex
      align-items: center
      font-weight: 600
      height: 100%
      font-size: 80px
      text-align: center
    &__main
      height: 100%
      display: flex
    &__couponsList
      max-width: 35vw
      overflow: auto
      width: 100%
      box-sizing: border-box
      display: flex
      flex-direction: column
      padding: 44px 36px 65px
      & > div
        height: 152px
        &:not(:last-child)
          margin-bottom: 30px
      @media (max-width: 1080px)
        max-width: 100vw
    &__queueContainer
      max-width: 35vw
      width: 100%
      box-sizing: border-box
      display: flex
      background-color: #000000
      flex-direction: column
      @media (max-width: 1080px)
        display: none
      &--hidden
        display: none
    &__queueTitle
      padding: 37px 56px 46px
      font-size: 48px
    &__queueCouponsList
      display: grid
      grid-template-columns: 1fr 1fr
</style>
