<template>
  <form class="card auth-card"
        @submit.prevent="submit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text"
               v-model.trim="email"
               :class="{'invalid': $v.email.$dirty && $v.email.$invalid }">
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="$v.email.$dirty && $v.email.$invalid">
          Invalid Email
        </small>
      </div>
      <div class="input-field">
        <input id="password" type="password"
               v-model.trim="pass"
               :class="{'invalid': $v.email.$dirty && $v.pass.$invalid }">
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
               v-if="$v.pass.$dirty && !$v.pass.minLength">
          Invalid Pass, must be {{ $v.pass.$params.minLength.min }},
          your pass length {{ pass.length }}
        </small>
        <small class="helper-text invalid"
               v-else-if="$v.pass.$dirty && $v.pass.$invalid">
          Invalid Pass
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">
          Зарегистрироваться
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    pass: '',
  }),
  validations: {
    email: {
      email,
      required,
    },
    pass: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    ...mapActions(['login']),
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.login({
        email: this.email,
        password: this.pass,
      })
        .then(() => {
          this.$router.push('/');
        });
    },
  },
  mounted() {
    const { message } = this.$route.query;
    if (messages[message]) {
      this.$message(messages[message]);
    }
  },
};
</script>
