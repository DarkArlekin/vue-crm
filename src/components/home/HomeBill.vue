<template>
  <div class="col s12 m6 l4"
       v-if="Object.keys(rates).length">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line"
           v-for="rate in Object.keys(rates)"
           :key="rate">
          <span>{{ getCurrency(rate) | curr(rate) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeBill',
  props: {
    rates: {},
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    getCurrency(currency) {
      return Math.floor((this.getUserInfo.bill / (this.rates.RUB / this.rates.EUR))
        * this.rates[currency]);
    },
  },
};
</script>

<style scoped>

</style>
