import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//vuex export
import store from "../store";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/notes',
      name: 'Notes',
      component: () => import('../views/Notes.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile'),
      meta: { requireAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const routeGuard = to.matched.some(record => record.meta.requireAuth)
  const token = localStorage.getItem("token" )
  if (routeGuard && !token) {
    next({ name: "Login"})
  } else {
    next()
  }
});

export default router
