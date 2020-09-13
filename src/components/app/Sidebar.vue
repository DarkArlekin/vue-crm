<template>
  <ul class="sidenav app-sidenav"
      :class="{ 'open': isSidebarOpen }">
    <router-link
      tag="li"
      v-for="(link, ind) in links"
      exact-active-class="active"
      :to="link.href"
      :key="ind + 'sidenav'">
      <a href="#" class="waves-effect waves-orange pointer">
        {{ link.text }}
      </a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    links: [
      {
        href: '/',
        text: 'Счет',
      },
      {
        href: '/history',
        text: 'История',
      },
      {
        href: '/planning',
        text: 'Планирование',
      },
      {
        href: '/record',
        text: 'Новая запись',
      },
      {
        href: '/categories',
        text: 'Категории',
      },
    ],
  }),
};
</script>

<style scoped>

</style>
