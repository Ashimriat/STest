<template lang="pug">
  div.CurrencyMetal__container
    div.CurrencyMetal__name(
      :class="{'CurrencyMetal__name--2modules': modulesAmount >= 2}"
    )
      | {{ name }}
    div.CurrencyMetal__nameEng
      | {{ nameEng }}
</template>

<script>
  export default {
    name: 'CurrencyMetal',
    props: ['name', 'nameEng', 'modulesAmount']
  }
</script>

<style lang="sass">
  $breakpoint: 1080px

  .CurrencyMetal
    &__container
      display: flex
      flex-direction: column
    &__name
      font-size: 72px
      @media (max-width: $breakpoint)
        font-size: 48px
      &--2modules
        font-size: 48px
    &__nameEng
      font-size: 32px
      opacity: 0.6
</style>
