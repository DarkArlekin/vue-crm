<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submit">
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
          Создать
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
  name: 'CategoryCreate',
  data: () => ({
    name: '',
    num: 50,
  }),
  validations: {
    name: { required },
    num: {
      required,
      minValue: minValue(50),
    },
  },
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    ...mapActions(['createCategory']),
    resetFields() {
      this.name = 0;
      this.num = 50;
      this.$v.$reset();
    },
    submit() {
      if (this.$v.$invalid) {
        console.log(this.$v);
        this.$v.$touch();
        return;
      }
      this.createCategory({
        title: this.name,
        limit: this.num,
      })
        .then((e) => {
          this.resetFields();
          this.$emit('createCategory', e);
          this.$message('Категоря была создана');
        });
    },
  },
};
</script>

<style scoped>

</style>
