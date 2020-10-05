<template>
  <div>
    <Loader
      v-if="loading"/>
    <div
      v-else>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>

      <form class="form"
            @submit.prevent="submit">
        <div class="input-field">
          <select
            ref="select"
            v-model="current">
            <option
              v-for="(c, ind) in categories"
              :key="'set-categories' + ind"
              :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{'invalid': $v.amount.$dirty && $v.amount.$invalid}"
          >
          <label for="amount">Сумма</label>
          <span class="helper-text invalid"
                v-if="$v.amount.$dirty && $v.amount.$invalid">
            минимальное значение {{ this.$v.amount.$params.minValue.min }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{'invalid': $v.description.$dirty && $v.description.$invalid}"
          >
          <label for="description">Описание</label>
          <span class="helper-text invalid"
                v-if="$v.description.$dirty && $v.description.$invalid">
            укажите описание
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'record',
  data: () => ({
    select: null,
    categories: null,
    loading: true,
    current: null,
    type: 'outcome',
    amount: 0,
    description: '',
  }),
  mounted() {
    this.updateCategories();
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    canCreateRecord() {
      if (this.type === 'income') return true;
      return this.getUserInfo.bill >= this.amount;
    },
  },
  methods: {
    ...mapActions(['fetchCategories', 'createNewRecord', 'updateUserBill']),
    updateComponent() {
      if (this.select && this.select.destroy) {
        this.select.destroy();
      }
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    },
    resetFields() {
      this.current = this.categories[0].id;
      this.amount = 0;
      this.description = '';
    },
    updateComponentUserBill() {
      this.loading = true;
      const bill = this.type === 'income'
        ? +this.getUserInfo.bill + this.amount
        : this.getUserInfo.bill - this.amount;
      this.updateUserBill({
        bill,
      })
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          this.resetFields();
          this.updateComponent();
        });
    },
    updateCategories() {
      this.loading = true;
      this.fetchCategories()
        .then((e) => {
          this.categories = e;
          this.loading = false;
          return e[0];
        })
        .then((e) => {
          this.current = e.id;
        })
        .then(() => {
          this.updateComponent();
        });
    },
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        this.createNewRecord({
          id: this.current,
          // eslint-disable-next-line no-return-assign
          category: this.categories.find((e) => e.id = this.current).title,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: (new Date()).toJSON(),
        })
          .then(() => {
            this.updateComponentUserBill();
          });
      } else {
        this.$message(`недостаточно денег на счету, остаток: ${this.getUserInfo.bill}`, {
          err: true,
          displayLength: 2000,
        });
      }
    },
  },
  validations: {
    amount: {
      required,
      minValue: minValue(0),
    },
    description: { required },
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
