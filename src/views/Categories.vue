<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <Loader v-if="loading"/>
    <section v-else>
      <div class="row">
        <CategoryCreate
          @createCategory="updateCategories"/>
        <CategoryEdit
          v-if="categories.length"
          @categoryEdited="updateCategories"
          :categories="categories"/>
        <h4 v-else> Нет категорий </h4>
      </div>
    </section>
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
    this.updateCategories();
  },
  methods: {
    ...mapActions(['fetchCategories']),
    updateCategories() {
      this.loading = true;
      this.fetchCategories()
        .then((e) => {
          this.categories = e;
          this.loading = false;
        });
    },
  },
};
</script>
