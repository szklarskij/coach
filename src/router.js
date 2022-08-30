import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';

import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegister = () => import('./pages/coaches/CoachRegister.vue');
const ContactCoach = () => import('./pages/request/ContactCoach.vue');

const RequestReceived = () => import('./pages/request/RequestReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requeriesAuth: true },
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requeriesAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requeriesUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

//navigation guards
router.beforeEach(function (to, _, next) {
  if (to.meta.requeriesAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requeriesUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
