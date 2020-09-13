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
      <div class="input-field">
        <input id="name" type="text"
               v-model.trim="name"
               :class="{'invalid': $v.name.$dirty && $v.name.$invalid}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid"
               v-if="$v.name.$dirty && $v.name.$invalid">
          User name is required
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox"
                 v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'registration',
  data: () => ({
    email: '',
    pass: '',
    name: '',
    agree: false,
  }),
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.pass,
        name: this.name,
      };

      console.log(formData);

      this.$router.push('/');
    },
  },
  validations: {
    email: {
      email,
      required,
    },
    pass: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
    },
    agree: {
      checked: (v) => v,
    },
  },
};
</script>
