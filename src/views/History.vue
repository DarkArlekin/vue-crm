<template>
  <div>
    <Loader
      v-if="loading"/>
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      <div class="history-chart">
        <canvas ref="canvas"></canvas>
      </div>

      <section>
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="(rec, ind) in records"
            :key="'history-rec' + ind">
            <td>{{ ind + 1 }}</td>
            <td>{{ rec.amount | curr }}</td>
            <td>{{ rec.date | date }}</td>
            <td>{{ rec.category }}</td>
            <td>
            <span class="white-text badge red"
                  :class="{'green': rec.type === 'income'}">
              {{ rec.type }}
            </span>
            </td>
            <td>
              <button class="btn-small btn"
                      @click="$router.push('/detail/' + rec.recId)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>

        <Paginate
          :page-count="tempRecords.length / 5"
          :click-handler="paginateHandler"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"/>
      </section>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import date from '@/filters/fDate';
import { Pie } from 'vue-chartjs';

export default {
  name: 'History',
  extends: Pie,
  data: () => ({
    tempRecords: [],
    loading: true,
    nowPugLvl: 0,
    chartData: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1.4,
      }],
    },
  }),
  computed: {
    records() {
      return this.tempRecords.slice(5 * this.nowPugLvl, (5 * this.nowPugLvl) + 5);
    },
  },
  mounted() {
    this.fetchRecords()
      .then((e) => {
        this.tempRecords = e;
      })
      .then(() => {
        this.chartDataRender();
      })
      .then(() => {
        this.loading = false;
      });
  },
  filters: { date },
  methods: {
    ...mapActions(['fetchRecords']),
    chartDataRender() {
      this.chartData.labels = this.records.map((el) => el.description);
      this.chartData.datasets[0].data = this.records.map((el) => el.amount);
      this.renderChart(this.chartData);
    },
    paginateHandler(e) {
      this.nowPugLvl = e - 1;
      this.chartDataRender();
    },
  },
};
</script>
