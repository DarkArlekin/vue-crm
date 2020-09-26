<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <Loader v-if="loading"/>
    <section v-else>
      <div class="row">
        <CategoryCreate
          @createCategory="addCategory"/>
        <CategoryEdit/>
      </div>
    </section>
    <div v-for="(cat, ind) in categories" :key="'cat' + ind">
      <a href="">{{ cat }}</a>
    </div>
  </div>
</template>

<script>
import CategoryCreate from '@/components/category/CategoryCreate.vue';
import CategoryEdit from '@/components/category/CategoryEdit.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
    loading: true,
  }),
  components: {
    CategoryEdit,
    CategoryCreate,
  },
  mounted() {
    this.fetchCategories()
      .then((e) => {
        console.log(e);
        this.categories = e;
        this.loading = false;
      });
  },
  methods: {
    ...mapActions(['fetchCategories']),
    addCategory(e) {
      this.categories.push(e);
    },
  },
};
</script>
