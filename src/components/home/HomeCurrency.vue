<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="rate in Object.keys(rates)"
            :key=" rate +'cur'">
            <td>{{ rate }}</td>
            <td>{{ rates[rate] }}</td>
            <td>{{ date | fDate }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import fDate from '@/filters/fDate';

export default {
  name: 'HomeCurrency',
  props: {
    rates: Object,
    date: String,
  },
  filters: {
    fDate,
  },
};
</script>

<style scoped>

</style>
