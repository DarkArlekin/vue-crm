import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import 'materialize-css/dist/js/materialize.min';
import pMessage from '@/utils/pMessage';

Vue.use(pMessage);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyAfvemH11j1fa6HldTIvXOqavavbet05ho',
  authDomain: 'vue-my-srm.firebaseapp.com',
  databaseURL: 'https://vue-my-srm.firebaseio.com',
  projectId: 'vue-my-srm',
  storageBucket: 'vue-my-srm.appspot.com',
  messagingSenderId: '47179782337',
  appId: '1:47179782337:web:0dcb0609eb9a522d849c40',
});

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
