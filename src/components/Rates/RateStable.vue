<template lang="pug">
  div.RateStable__container(
    :class="{'RateStable__container--2modules': modulesAmount >= 2}"
  )
    div
      | {{ value }}
    div
      | за {{ `${exchangeValue} ${code}` }}
</template>

<script>
  export default {
    name: 'RateStable',
    props: ['value', 'code', 'exchangeValue', 'modulesAmount']
  }
</script>

<style lang="sass">
  $breakpoint: 1080px

  .RateStable
    &__container
      padding-top: 0
      & > div:first-child
        font-size: 112px
        @media (max-width: $breakpoint)
          font-size: 92px
      & > div:last-child
        font-size: 32px
      &--2modules
        & > div:first-child
          font-size: 92px
</style>
