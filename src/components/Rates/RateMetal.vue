<template lang="pug">
  Fragment
    div.RateMetal__value
      | {{ gramRub }}
    div.RateMetal__value
      | {{ rubGram }}
</template>

<script>
  import { Fragment } from 'vue-fragment';

  export default {
    name: 'MetalRate',
    components: { Fragment },
    props: ['gramRub', 'rubGram']
  }
</script>

<style lang="sass">
  $breakpoint: 1080px

  .RateMetal
    &__value
      font-size: 112px
      @media (max-width: $breakpoint)
        font-size: 80px
</style>
