<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Empty',
  computed: {
    ...mapGetters(['error']),
  },
  watch: {
    error(fireErr) {
      this.$message(fireErr, {
        err: true,
        displayLength: 3200,
      });
    },
  },
};
</script>

<style scoped>

</style>
