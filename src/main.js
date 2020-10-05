import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import Paginate from 'vuejs-paginate';
import './registerServiceWorker';
import router from './router';
import store from './store';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import fireinit from './fireinit.json';

import 'materialize-css/dist/js/materialize.min';
import pMessage from '@/utils/pMessage';

import fCurrency from '@/filters/fCurrency';
import Loader from '@/components/app/Loader.vue';

Vue.use(pMessage);
Vue.use(Vuelidate);
Vue.filter('curr', fCurrency);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

Vue.config.productionTip = false;

firebase.initializeApp(fireinit);

let app;

firebase
  .auth()
  .onAuthStateChanged(() => {
    if (!app) {
      app = new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount('#app');
    }
  });
