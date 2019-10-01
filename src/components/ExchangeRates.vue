<template lang="pug">
  Fragment
    div.ExchangeRates__main
      div.ExchangeRates__dateTime(
        :class="{'ExchangeRates__dateTime--3modules': modulesAmount === 3}"
      )
        | 9 сентября 2019, понедельник
      div.ExchangeRates__info
        div.ExchangeRates__titles
          div(
            v-for="(titlesList, index) in titles"
            :key="`${index === 0 ? 'ThingToRub' : 'RubToThing'}`"
          )
            div.ExchangeRates__exchangeRus(
              :class="{'ExchangeRates__exchangeRus--2modules': modulesAmount >= 2}"
            )
              | {{ titlesList[0] }}
            div.ExchangeRates__exchangeEng(
              :class="{'ExchangeRates__exchangeEng--2modules': modulesAmount >= 2}"
            )
              | {{ titlesList[1] }}
        div.ExchangeRates__currencies
          div.ExchangeRates__currencyInfo(
            v-for="(rate, parentIndex) in tabInfo"
            :key="`${['conditional', 'stable', 'metals'][activeTab]}-value${parentIndex}`"
          )
            Fragment
              CurrencyFlagged(
                v-if="activeTab === 0 || activeTab === 1"
                :key="rate.currencyCode"
                :flag="rate.flag"
                :modulesAmount="modulesAmount"
                :code="rate.currencyCode"
                :name="rate.name"
              )
              CurrencyMetal(
                v-if="activeTab === 2"
                :key="rate.nameEng"
                :modulesAmount="modulesAmount"
                :name="rate.name"
                :nameEng="rate.nameEng"
              )
            Fragment
              RateConditional(
                v-if="activeTab === 0"
                v-for="(rateInfo, index) in rate.exchanges"
                :key="`${rate.currencyCode}-value-${index}`"
                :code="rate.currencyCode"
                :modulesAmount="modulesAmount"
                :mainValue="rateInfo.mainValue"
                :pairs="rateInfo.pairs"
              )
              RateStable(
                v-if="activeTab === 1"
                v-for="(rateInfo, index) in rate.exchanges"
                :key="`${rate.currencyCode}-value-${index}`"
                :modulesAmount="modulesAmount"
                :code="rate.currencyCode"
                :exchangeValue="rate.currencyValue"
                :value="rateInfo.value"
              )
              RateMetal(
                v-if="activeTab === 2"
                :modulesAmount="modulesAmount"
                :rubGram="rate.rubGramValue"
                :gramRub="rate.gramRubValue"
              )
      div.ExchangeRates__otherRates(
        :class="{'ExchangeRates__otherRates--3modules': modulesAmount === 3}"
      )
        div.ExchangeRates__exchangeNote
          | {{ bottomText }}
        div.ExchangeRates__ratesList
          div.ExchangeRates__ratesTab(
            v-for="(tab, index) in tabs"
            :key="tab"
            :class="{'ExchangeRates__ratesTab--active': activeTab === index}"
            @click="setActiveTab(index)"
          )
            | {{ tab }}

</template>

<script>
  import { mapGetters } from 'vuex';
  import { Fragment } from 'vue-fragment';
  import RateConditional from './Rates/RateConditional';
  import CurrencyFlagged from './Rates/CurrencyFlagged';
  import CurrencyMetal from './Rates/CurrencyMetal';
  import RateMetal from './Rates/RateMetal';
  import RateStable from './Rates/RateStable';

  export default {
    name: 'ExchangeRates',
    components: {
      Fragment,
      RateMetal, CurrencyMetal,
      RateConditional, CurrencyFlagged,
      RateStable
    },
    props: ['modulesAmount'],
    data() {
      return {
        activeTab: 0,
        conditional: [
          {
            currencyCode: 'USD',
            name: 'Доллар США, $',
            flag: 'Флаг США',
            exchanges: [
              {
                type: 'Currency2RUB',
                mainValue: 63.36,
                pairs: [
                  {
                    type: 'От 1000',
                    value: 63.85
                  },
                  {
                    type: 'От 5000',
                    value: 63.96
                  },
                  {
                    type: 'Сбербанк Онлайн',
                    value: 64.44
                  }
                ]
              },
              {
                type: 'RUB2Currency',
                mainValue: 67.75,
                pairs: [
                  {
                    type: 'От 1000',
                    value: 67.26
                  },
                  {
                    type: 'От 5000',
                    value: 67.01
                  },
                  {
                    type: 'Сбербанк Онлайн',
                    value: 66.67
                  }
                ]
              }
            ]
          },
          {
            currencyCode: 'EUR',
            name: 'Евро, €',
            flag: 'Флаг ЕС',
            exchanges: [
              {
                type: 'Currency2RUB',
                mainValue: 69.89,
                pairs: [
                  {
                    type: 'От 1000',
                    value: 70.45
                  },
                  {
                    type: 'От 5000',
                    value: 70.78
                  },
                  {
                    type: 'Сбербанк Онлайн',
                    value: 71.10
                  }
                ]
              },
              {
                type: 'RUB2Currency',
                mainValue: 74.83,
                pairs: [
                  {
                    type: 'От 1000',
                    value: 74.27
                  },
                  {
                    type: 'От 5000',
                    value: 74.01
                  },
                  {
                    type: 'Сбербанк Онлайн',
                    value: 73.62
                  }
                ]
              }
            ]
          }
        ],
        stable: [
          {
            currencyCode: 'JPY',
            name: 'Японская йена, ¥',
            flag: '',
            currencyValue: 100,
            exchanges: [
              {
                type: 'Currency2RUB',
                value: 58.44,
              },
              {
                type: 'RUB2Currency',
                value: 64.01
              }
            ]
          },
          {
            currencyCode: 'GBP',
            name: 'Фунт стерлингов, £',
            flag: '',
            currencyValue: 1,
            exchanges: [
              {
                type: 'Currency2RUB',
                value: 76.81,
              },
              {
                type: 'RUB2Currency',
                value: 85.11
              }
            ]
          },
          {
            currencyCode: 'CHF',
            name: 'Швейцарский франк, ₣',
            flag: 'Флаг',
            currencyValue: 1,
            exchanges: [
              {
                type: 'Currency2RUB',
                value: 63.14,
              },
              {
                type: 'RUB2Currency',
                value: 69.29
              }
            ]
          },
          /*
          {
            currencyCode: 'KZT',
            name: 'Казахстанский тенге',
            flag: '',
            currencyValue: 100,
            exchanges: [
              {
                type: 'Currency2RUB',
                value: 11.58,
              },
              {
                type: 'RUB2Currency',
                value: 22.34
              }
            ]
          },
          {
            currencyCode: 'BYN',
            name: 'Белорусский рубль',
            flag: '',
            currencyValue: 1,
            exchanges: [
              {
                type: 'Currency2RUB',
                value: 28.24,
              },
              {
                type: 'RUB2Currency',
                value: 34.39
              }
            ]
          },
          {
            currencyCode: 'PLN',
            name: 'Польский злОтый',
            flag: '',
            currencyValue: 1,
            exchanges: [
              {
                type: 'Currency2RUB',
                value: 16.12,
              },
              {
                type: 'RUB2Currency',
                value: 17.23
              }
            ]
          }
          */
        ],
        metals: [
          {
            name: 'ЗолОто',
            nameEng: 'Gold',
            gramRubValue: 2965,
            rubGramValue: 3268
          },
          {
            name: 'Серебро',
            nameEng: 'Silver',
            gramRubValue: 35.49,
            rubGramValue: 39.04
          },
          {
            name: 'Платина',
            nameEng: 'Platinum',
            gramRubValue: 1863,
            rubGramValue: 2057
          },
          {
            name: 'Палладий',
            nameEng: 'Palladium',
            gramRubValue: 3081,
            rubGramValue: 3413
          }
        ]
      }
    },
    methods: {
      setActiveTab(newTab) {
        this.activeTab = newTab;
      }
    },
    computed: {
      ...mapGetters(['RATES']),
      tabs: () => ['USD, EUR', 'JPY, GBP, CHF, BYN, KZT, PLN', 'Драгоценные металлы'],
      titles() {
        return this.activeTab === 2 ?
          [['Грамм → ₽', 'Gram → Roubles'], ['₽ → грамм', 'Roubles → Gram']] :
          [['Валюта → ₽', 'Currency → Roubles'], ['₽ → валюта', 'Roubles → Currency']]
      },
      tabInfo() {
        const currentSource = [this.conditional, this.stable, this.metals][this.activeTab];
        console.log('CURRENT SOURCE', currentSource);
        console.log(this.modulesAmount === 3 ? [currentSource[0]] : currentSource);
        return this.modulesAmount === 3 ? [currentSource[0]] : currentSource;
      },
      bottomText() {
        return this.activeTab === 2 ?
          'Цены при совершении операций с обезличенныи металлическими счетами' :
          'Курсы могут отличаться во время обмена валют. Уточняйте курс у сотрудников на кассе.';
      }
    }
  }
</script>

<style lang="sass">
  $breakpoint: 1080px

  .ExchangeRates
    &__noInfo
      display: flex
      justify-content: center
      align-items: center
      font-size: 26px
      font-weight: 600
      height: 100%
    &__main
      height: 100%
      padding-top: 20px
    &__dateTime
      height: 56px
      padding: 0 32px 28px
      display: flex
      justify-content: flex-end
      font-size: 32px
      opacity: 0.6
      font-weight: bold
      &--3modules
        display: none
    &__info
      @media (max-width: $breakpoint)
        height: calc(100vh - 360px)
      & > *
        font-weight: 600
        font-family: sans-serif
    &__otherRates
      display: flex
      flex-direction: column
      &--3modules
        display: none
    &__ratesList
      display: flex
      justify-content: space-evenly
      padding-top: 24px
    &__ratesTab
      opacity: 0.6
      font-size: 32px
      font-weight: bold
      padding-bottom: 24px
      &--active
        opacity: 1
        border-bottom: 12px solid #29b260
    &__exchangeNote
      font-size: 32px
      display: flex
      max-width: 70%
      padding: 56px 0 30px
      align-self: center
      text-align: center
    &__titles
      display: flex
      justify-content: space-around
      padding-left: 27%
      padding-bottom: 16px
      @media (max-width: $breakpoint)
        padding-left: 32%
      & > div
        display: flex
        flex-direction: column
        flex-basis: 50%
    &__exchangeRus
      font-size: 72px
      @media (max-width: $breakpoint)
        font-size: 48px
      &--2modules
        font-size: 48px
    &__exchangeEng
      font-size: 48px
      opacity: 0.6
      @media (max-width: $breakpoint)
        font-size: 32px
      &--2modules
        font-size: 32px
    &__currencies
      height: 54vh
      display: flex
      flex-direction: column
    &__currencyInfo
      display: flex
      &:not(:last-child)
        margin-bottom: 2vh
      @media (max-width: $breakpoint)
        max-height: 21vh
      & > div:first-child
        padding-left: 3%
        width: 27%
        height: fit-content
        box-sizing: border-box
        @media (max-width: $breakpoint)
          width: 32%
      & > div:not(:first-child)
        flex-basis: calc(73% / 2)
        @media (max-width: $breakpoint)
          flex-basis: calc(68% / 2)
</style>
