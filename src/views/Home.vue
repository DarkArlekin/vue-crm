<template>
  <div>
    <Loader
      v-if="loading"/>

    <div v-else>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small"
                @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <div class="row">

        <HomeBill
          :rates="rates"/>

        <HomeCurrency
          :rates="rates"
          :date="currency.date"/>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HomeBill from '@/components/home/HomeBill.vue';
import HomeCurrency from '@/components/home/HomeCurrency.vue';

export default {
  name: 'home',
  data: () => ({
    loading: true,
    currency: {},
    rates: {},
  }),
  methods: {
    ...mapActions(['fetchCurrency']),
    refresh() {
      this.loading = true;
      this.fetchCurrency()
        .then((e) => {
          console.log(e);
          this.loading = false;
          this.currency = e;
        });
    },
  },
  async mounted() {
    this.currency = await this.fetchCurrency();
    console.log(this.currency);
    this.rates = Object.keys(this.currency.rates)
      .filter((rate) => ((rate === 'RUB' || rate === 'USD' || rate === 'EUR')))
      .reduce((acc, rate) => {
        acc[rate] = this.currency.rates[rate];
        return acc;
      }, { EUR: 1 });
    this.loading = false;
  },
  components: {
    HomeCurrency,
    HomeBill,
  },
};
</script>
