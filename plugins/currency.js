import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter, [
  {
    // default name 'currency'
    symbol: '$',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: false,
  },
  {
    // default name 'currency_2'
    name: 'dolares',
    symbol: 'usd',
    thousandsSeparator: ' ',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: false,
  },
])
