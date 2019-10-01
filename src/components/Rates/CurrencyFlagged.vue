<template lang="pug">
  div.CurrencyFlagged__container
    div.CurrencyFlagged__code(
      :class="{'CurrencyFlagged__code--2modules': modulesAmount >= 2}"
    )
      | {{ code }}
    div.CurrencyFlagged__flag(
      :class="{'CurrencyFlagged__flag--2modules': modulesAmount >= 2}"
    )
    div.CurrencyFlagged__name(
      :class="{'CurrencyFlagged__name--2modules': modulesAmount >= 2}"
    )
      | {{ name }}
</template>

<script>
  export default {
    name: 'CurrencyFlagged',
    props: ['flag', 'code', 'name', 'modulesAmount']
  }
</script>

<style lang="sass">
  $breakpoint: 1080px
  @mixin flagSmall
    order: 2
    min-width: 56px
    height: 56px
    margin: 20px 0 0 0
    align-self: flex-start
  @mixin codeSmall
    order: 1
    font-size: 92px
    flex-basis: 75%

  .CurrencyFlagged
    &__container
      display: flex
      padding: 0 31px 0 0
      flex-wrap: wrap
    &__flag
      min-width: 88px
      height: 88px
      border: 1px solid
      border-radius: 50%
      order: 1
      align-self: center
      margin-right: 10px
      @media (max-width: $breakpoint)
        @include flagSmall
      &--2modules
        @include flagSmall
    &__code
      font-size: 112px
      flex-basis: 70%
      order: 2
      @media (max-width: $breakpoint)
        @include codeSmall
      &--2modules
        @include codeSmall
    &__name
      font-size: 32px
      order: 3
      padding-left: 105px
      @media (max-width: $breakpoint)
        padding: 0
      &--2modules
        padding: 0
</style>
