<template lang="pug">
  Fragment
    div.RateMetal__value(
      :class="{'RateMetal__value--2modules': modulesAmount >= 2}"
    )
      | {{ gramRub }}
    div.RateMetal__value(
      :class="{'RateMetal__value--2modules': modulesAmount >= 2}"
    )
      | {{ rubGram }}
</template>

<script>
  import { Fragment } from 'vue-fragment';

  export default {
    name: 'MetalRate',
    components: { Fragment },
    props: ['gramRub', 'rubGram', 'modulesAmount']
  }
</script>

<style lang="sass">
  $breakpoint: 1080px

  .RateMetal
    &__value
      font-size: 112px
      @media (max-width: $breakpoint)
        font-size: 80px
      &--2modules
        font-size: 80px
</style>
