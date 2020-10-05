<template>
  <div>
    <Loader
      v-if="loading"/>
    <div
      v-else>
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb">
          Расход
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card red">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | curr }}</p>
              <p>Категория: {{ record.category }}</p>

              <small>{{ record.date | date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import date from '@/filters/fDate';

export default {
  name: 'History',
  data: () => ({
    record: {},
    loading: true,
  }),
  mounted() {
    this.fetchRecords()
      .then((e) => {
        this.record = e.find((el) => el.recId === this.$route.params.id);
        this.loading = false;
      });
  },
  filters: { date },
  methods: {
    ...mapActions(['fetchRecords']),
  },
};
</script>
