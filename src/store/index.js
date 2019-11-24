import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import breadcrumb from './modules/breadcrumb'
import user from './modules/user'
import dataHub from './modules/dataHub'
import influencer from './modules/influencer'
import address from './modules/address'
import toast from './modules/toast'
import file from './modules/file'
import campaign from './modules/campaign'
import reports from './modules/reports'
import roles from './modules/roles'
import clients from './modules/clients'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    breadcrumb,
    user,
    dataHub,
    influencer,
    address,
    toast,
    file,
    campaign,
    reports,
    roles,
    clients
  }
})
