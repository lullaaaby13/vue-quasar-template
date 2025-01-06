import { defineRouter } from '#q-app/wrappers';
import type { NavigationGuardNext } from 'vue-router';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const extendedRoutes = setupLayouts(routes);

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: extendedRoutes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next: NavigationGuardNext) => {
    console.log('beforeEach / to: ', to);
    console.log('beforeEach / from: ', from);
    // const authStore = useAuthStore();
    // if (to.meta.requiresAuth && !authStore.isAuthenticated && to.name !== '/login') {
    //   return next('/login');
    // } else {
    //   next();
    // }
    next();
  });

  return Router;
});
