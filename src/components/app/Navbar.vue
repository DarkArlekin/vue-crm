<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#"
           @click.prevent="$emit('clickOnMenu')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">
          {{ date | fDate('date time') }}
        </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text input-field" href="#"
             data-target="dropdown" tabindex="1"
             ref="dropDownBtn"
          >
            {{ getUserInfo.name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text"
                 @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import fDate from '@/filters/fDate';

export default {
  name: 'Navbar',
  data: () => ({
    date: new Date(),
    interval: undefined,
    dropDown: undefined,
  }),
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    ...mapActions(['signOut']),
    logout() {
      this.signOut()
        .then(() => {
          this.$router.push('/login?message=logout');
        });
    },
  },
  filters: {
    fDate,
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    const el = this.$refs.dropDownBtn;
    this.dropDown = window.M.Dropdown.init(el, {
      constrainWidth: false,
    });
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.dropDown) {
      this.dropDown.destroy();
    }
  },
};
</script>

<style scoped>

</style>
