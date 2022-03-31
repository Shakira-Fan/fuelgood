import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewsView from '../views/NewsView.vue';
import CartView from '../views/CartView.vue';
import UserView from '../views/UserView.vue';
import AccountView from '../views/AccountView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
    props: true,
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
