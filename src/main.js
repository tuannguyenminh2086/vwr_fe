import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './services/api'
// import auth from './helper/authenticate'
import './globalFilters'
import VueRouterUserRoles from 'vue-router-user-roles'
import { env } from './config'
import localforage from './services/storage'
// Libs
import BootstrapVue from 'bootstrap-vue'
import Vuebar from 'vuebar'
import geb from 'vue-geb'
import Vue2Filters from 'vue2-filters'
import VueMoment from 'vue-moment'
import VeeValidate from 'vee-validate'
import vSelect from 'vue-select'

// Libs style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

// App style
import './assets/scss/main.scss'

Vue.config.productionTip = false

Vue.use(api)
Vue.use(BootstrapVue)
Vue.use(Vuebar)

Vue.use(geb)
Vue.use(Vue2Filters)
Vue.use(VueMoment)
Vue.use(VeeValidate, { inject: true, fieldsBagName: 'veeFields' })
Vue.use(VueRouterUserRoles, { router })

vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: createElement => createElement('span', '▼')
  }
})
// Register the vue-select component
Vue.component('v-select', vSelect)

// authenticate user
// check storage
let userRole = localforage.getItem('current-user-role')
userRole.then(role => {
  switch (role) {
    case 'Super Admin':
      Vue.prototype.$user.set({ role: env.USER_ROLE_SUPER_ADMIN })
      break
    case 'Admin':
      Vue.prototype.$user.set({ role: env.USER_ROLE_ADMIN })
      break
    case 'Staff':
      Vue.prototype.$user.set({ role: env.USER_ROLE_STAFF })
      break
    default:
      Vue.prototype.$user.set({ role: env.USER_ROLE_GUEST })
      break
  }
  // init app
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
