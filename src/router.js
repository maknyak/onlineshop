import Vue from 'vue'
import Router from 'vue-router'
import Admin from './layouts/Admin'
import Order from './pages/Order'
import Login from './pages/Login'
import { TokenService } from './services/storage.service'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Admin',
      redirect: '/Order',
      component: Admin,
      children: [
        {
          path: '/Order',
          component: Order
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken()

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next()
})

export default router
