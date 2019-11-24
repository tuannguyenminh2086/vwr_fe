import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import { UPDATE_BREADCRUMB } from '@/store/action-types'
import localforage from '../services/storage'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  /* Update breadcrumb */
  if (to.meta.listBreadcrumb && to.meta.listBreadcrumb.length > 0) {
    store.dispatch(`breadcrumb/${UPDATE_BREADCRUMB}`, to.meta.listBreadcrumb)
  }
  /* End Update breadcrumb */
  /* Check authentication if required */
  const authRequired = to.matched.some(record => record.meta.requiresAuth)
  const authed = store.state.auth.isLogedIn || false
  // check token
  localforage.getItem('access-token').then(response => {
    if (response) {
      store.commit('auth/AUTH_SUCCESS', { isLogedIn: true, accessToken: response })
      store.dispatch('user/getLoggedUserData')
    }
    if (to.path === '/login') {
      next()
    } else if (authRequired && !authed) {
      if (!response) {
        next({ path: '/login' })
      } else {
        next()
      }
    } else {
      next()
    }
  }).catch(error => {
    console.log(error)
  })
})
/* Check authentication if required */
router.afterEach((to, from) => {
})

export default router
