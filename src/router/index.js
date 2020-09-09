import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
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
    name: 'register',
    meta: { layout: 'empty-layout' },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main-layout' },
    component: () => import('@/views/Home.vue'),
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
