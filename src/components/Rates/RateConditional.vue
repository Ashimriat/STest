<template lang="pug">
  div.RateConditional__container(
    :class="{'RateConditional__container--2modules': modulesAmount >= 2}"
  )
    div
      | {{ mainValue }}
    div.RateConditional__rates
      div(
        v-for="(pair, index) in values"
        :key="`${code}-pair-${index}`"
      )
        div
          | {{ pair.type }}
        div
          | {{ pair.value }}
</template>

<script>
  export default {
    name: 'RateConditional',
    props: ['mainValue', 'pairs', 'code', 'modulesAmount'],
    computed: {
      values() {
        return this.modulesAmount >= 2 ? [this.pairs[0]] : this.pairs;
      }
    }
  }
</script>

<style lang="sass">
  $breakpoint: 1080px

  .RateConditional
    &__container
      display: flex
      flex-direction: column
      & > div:first-child
        font-size: 112px
        @media (max-width: $breakpoint)
          font-size: 92px
      &--2modules
        & > div:first-child
          font-size: 92px
    &__rates
      display: flex
      padding: 1vh 2vw 0 0
      flex-wrap: wrap
      height: 100%
      & > div
        display: flex
        flex-direction: column
        flex-basis: 25%
        @media (max-width: $breakpoint)
          flex-basis: 50%
        &:last-child
          flex-basis: 50%
          @media (max-width: $breakpoint)
            flex-basis: 100%
            margin-top: 30px
        & > div:first-child
          margin-bottom: 10px
          font-size: 32px
        & > div:last-child
          font-size: 48px
</style>
