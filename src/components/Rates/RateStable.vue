<template lang="pug">
  div.RateStable__container
    div
      | {{ value }}
    div
      | за {{ `${exchangeValue} ${code}` }}
</template>

<script>
  export default {
    name: 'RateStable',
    props: ['value', 'code', 'exchangeValue']
  }
</script>

<style lang="sass">
  $breakpoint: 1080px

  .RateStable
    &__container
      padding-top: 12px
      & > div:first-child
        font-size: 112px
        @media (max-width: $breakpoint)
          font-size: 92px
      & > div:last-child
        font-size: 32px
</style>
