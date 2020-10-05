<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submit">
        <div class="input-field">
          <select
            ref="select"
            v-model="current">
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{'invalid': $v.name.$dirty && $v.name.$invalid}"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid"
                v-if="$v.name.$dirty && $v.name.$invalid">
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="num"
            :class="{'invalid': $v.num.$dirty && $v.num.$invalid}"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid"
                v-if="$v.num.$dirty && $v.num.$invalid">
            Минимальная величина {{ $v.num.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      required: true,
      type: Array,
    },
  },
  data: () => ({
    select: null,
    name: '',
    num: 50,
    current: null,
  }),
  validations: {
    name: { required },
    num: {
      required,
      minValue: minValue(50),
    },
  },
  methods: {
    ...mapActions(['updateCategory']),
    input(e) {
      console.log(e);
    },
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.updateCategory({
        title: this.name,
        limit: this.num,
        id: this.current,
      })
        .then(() => {
          this.$message('category updated');
          this.$emit('categoryEdited');
        });
    },
  },
  watch: {
    current(nowElId) {
      const { id, title, limit } = this.categories.find((e) => e.id === nowElId);
      this.current = id;
      this.name = title;
      this.num = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.name = title;
    this.num = limit;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style scoped>

</style>
