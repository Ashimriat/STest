<template lang="pug">
  div(
    :class=`{
      'Coupon__container': area,
      'Coupon__queueContainer': !area,
      'Coupon__container--new': status === 'new' && area,
      'Coupon__container--remind': status === 'remind' && area,
      'Coupon__container--pending': ['newPending', 'remindPending'].includes(status)
    }`
  )
    div
      | {{ type }}
    div
      | {{ code }}
    div(v-if="area")
      div.Coupon__arrow(
        :class=`{
          'Coupon__arrow--new': ['new', 'newPending'].includes(status),
          'Coupon__arrow--remind': ['remind', 'remindPending'].includes(status),
          'Coupon__arrow--active': ['new', 'remind'].includes(status)
        }`
      )
    div(v-if="area")
      | {{ area }}
</template>

<script>
  export default {
    name: 'Coupon',
    props: ['code', 'type', 'status', 'area']
  }
</script>

<style lang="sass">
  $green: #36de61
  $orange: #ed652b

  .Coupon
    &__container
      display: flex
      width: 100%
      box-sizing: border-box
      border-radius: 22px
      font-size: 112px
      font-weight: bold
      color: #ffffff
      padding: 0 20px
      @media (max-width: 1080px)
        font-size: 160px
      &--new
        background-color: #36de61
        box-shadow: 0 2px 100px 0 $green
      &--remind
        background-color: #ed652b
        box-shadow: 0 2px 100px 0 $orange
      &--pending
        background-color: transparent
        transition: background-color ease-out 0.3s
      & > div
        display: flex
        justify-content: center
        align-items: center
        &:first-child
          min-width: 21.5%
        &:nth-child(2)
          min-width: 36.5%
        &:nth-last-child(2)
          min-width: 19%
          padding: 0 5%
          justify-content: flex-start
          box-sizing: border-box
        &:last-child
          min-width: 23%
    &__queueContainer
      display: flex
      width: 100%
      box-sizing: border-box
      font-size: 64px
      font-weight: bold
      color: #ffffff
      justify-content: center
      & > div:first-child
        width: 22%
      & > div:last-child
        width: 35%
    &__arrow
      position: relative
      height: 8px
      width: 100%
      left: -10%
      &::before, &::after
        position: absolute
        background-color: transparent
        width: 25px
        height: 25px
        border: 7px solid #ffffff
        border-bottom: 0
        border-left: 0
        transform: rotate(45deg)
        top: -11px
      &::before
        content: ""
        right: 0
      &--remind
        width: 70%
        background-color: $orange
        &::after
          content: ""
          right: - 20px
        &::before, &::after
          border-color: $orange
      &--new
        background-color: $green
        &::before
          border-color: #36de61
      &--active
        background-color: #ffffff
        &::before, &::after
          border-color: #ffffff
</style>
