import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // eslint-disable-next-line
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/DevicesView')

    },
    {
      path: '/map/:id',
      name: 'mapId',
      component: () => import('../views/MapView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView')
    },
    {
      path: '/create-new-user',
      name: 'createNewUser',
      component: () => import('../views/CreateUserVIew')
    },
    {
      path: '/add-device',
      name: 'addDevice',
      component: () => import('../views/AddDeviceView')
    },
    {
      path: '/edit/:id',
      name: 'editId',
      component: () => import('../views/EditDeviceView')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page404',
      component: () => import('../views/404View'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
