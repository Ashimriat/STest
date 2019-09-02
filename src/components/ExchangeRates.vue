<template lang="pug">
  Fragment
    div.rates__noInfo(v-if="!RATES.length")
      | Информация о курсах валют отсутствует
    div.rates__main(v-if="RATES.length")
      div.ratesHead
        div
          | Валюта
        div
          | Рублей за единицу
        div
          | Дата последнего обновления
      div.ratesInfo
        Fragment(
          v-for="rate in RATES"
          :key="rate.currency"
        )
          div
            | {{ rate.currency }}
          div
            | {{ rate.ratio }}
          div
            | {{ rate.date }}
</template>

<script>
  import { mapGetters } from 'vuex';
  import { Fragment } from 'vue-fragment';


  export default {
    name: 'ExchangeRates',
    components: { Fragment },
    computed: {
      ...mapGetters(['RATES'])
    }
  }
</script>

<style lang="sass">
  .rates
    &__noInfo
      display: flex
      justify-content: center
      align-items: center
      font-size: 26px
      font-weight: 600
      height: 100%
    &__main
      width: 90%
      height: 100%
  .ratesHead
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
      &:not(:last-child)
        flex-basis: 149px
        border-right: 1px solid #000000
      &:last-child
        flex-basis: 500px
  .ratesInfo
    width: 100%
    max-height: calc(100% - 50px)
    border-left: 1px solid #000000
    overflow: auto
    display: grid
    grid-template-columns: 145px 146px 486px
    & > div
      display: flex
      justify-content: center
      align-items: center
      height: 50px
      border-right: 1px solid #000000
      border-bottom: 1px solid #000000
</style>
