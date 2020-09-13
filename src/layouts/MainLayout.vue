<template>
  <div class="app-main-layout">
    <Navbar
      @clickOnMenu="isSidebarOpen = !isSidebarOpen"/>

    <Sidebar
      :isSidebarOpen="isSidebarOpen"/>

    <main class="app-content"
          :class="{ 'full': !isSidebarOpen }">
      <div class="app-page">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue"
                   tag="a"
                   to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

export default {
  name: 'Main',
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  components: {
    Sidebar,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
