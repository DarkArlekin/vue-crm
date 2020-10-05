import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import user from './user';
import category from '@/store/category';
import record from '@/store/record';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    category,
    record,
  },
});
