import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main-layout',
    },
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty-layout',
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty-layout' },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      layout: 'main-layout',
    },
    component: () => import('@/views/Categories.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main-layout' },
    component: () => import('@/views/Detail.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main-layout' },
    component: () => import('@/views/History.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main-layout' },
    component: () => import('@/views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main-layout' },
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main-layout' },
    component: () => import('@/views/Record.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    meta: { layout: 'empty-layout' },
    component: () => import('@/components/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'Register') {
    next();
  } else if (!firebase.auth().currentUser) {
    next({ name: 'Login' });
  } else next();
});

export default router;
