import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/likes',
    name: 'Likes',
    component: () => import('../views/List.vue'),
  },
  {
    path: '/dislikes',
    name: 'Dislikes',
    component: () => import('../views/List.vue'),
  },
  {
    path: '/bought',
    name: 'Bought',
    component: () => import('../views/List.vue'),
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/List.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
