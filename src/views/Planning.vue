<template>
  <div>
    <Loader
      v-if="loading"/>
    <div
      v-else>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ getUserInfo.bill | curr }}</h4>
      </div>

      <section>
        <div
          v-for="(cat, ind) in categories"
          :key="'cat' + ind"
          ref="toolt"
          data-position="bottom" :data-tooltip="~~cat.progress + '% spent'">
          <p>
            <strong>{{ cat.title }}:</strong>
            {{ cat.amount | curr }} из {{ cat.limit | curr }}
          </p>
          <div class="progress">
            <div
              class="determinate"
              :style="{width: cat.progress + '%', backgroundColor: cat.color}"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: true,
    categories: [],
    tooltips: [],
  }),
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchRecords']),
  },
  mounted() {
    Promise.all([this.fetchCategories(), this.fetchRecords()])
      .then(([cat, rec]) => {
        this.categories = cat.map((e) => {
          const amount = rec.filter((ee) => e.id === ee.id)
            .reduce((acc, num) => acc + +num.amount, 0);
          const percent = amount / (e.limit / 100);
          const progress = percent > 100 ? 100 : percent;
          let color;
          if (percent < 50) {
            color = 'green';
          } else if (percent < 80) {
            color = 'yellow';
          } else {
            color = 'red';
          }
          return {
            title: e.title,
            amount,
            limit: e.limit,
            progress,
            color,
          };
        });
        this.loading = false;
      })
      .then(() => {
        this.$refs.toolt.forEach((e) => {
          this.tooltips.push(window.M.Tooltip.init(e));
        });
      });
  },
  beforeDestroy() {
    if (this.tooltips && this.tooltips[this.tooltips.length - 1].destroy) {
      this.tooltips.forEach((e) => {
        e.destroy();
      });
    }
  },
};
</script>
