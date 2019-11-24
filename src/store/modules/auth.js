import {
  AUTH_SUCCESS,
  LOGOUT,
  API_DATA_PENDING,
  API_DATA_FAILURE,
  API_DATA_SUCCESS
} from '../action-types'

import {
  doLogin,
  requestpwd,
  pwdReset
} from '../../services/userServives'

import router from '../../router/index'

import authenticate from '../../helper/authenticate'

const state = {
  isLogedIn: false,
  accessToken: '',
  refreshToken: '',
  loading: false,
  status: ''
}
const mutations = {
  [API_DATA_PENDING] (state) {
    state.loading = true
  },
  [API_DATA_SUCCESS] (state) {
    state.loading = false
  },
  [API_DATA_FAILURE] (state, payload) {
    state.status = Object.assign({}, payload)
  },
  [AUTH_SUCCESS] (state, payload) {
    state.isLogedIn = true
    state.accessToken = payload.accessToken
  },
  [LOGOUT] (state) {
    state.isLogedIn = false
    state.accessToken = ''
    state.refreshToken = ''
  }
}

const actions = {
  async login ({ commit, dispatch }, credential) {
    commit('API_DATA_PENDING')
    try {
      const { data } = await doLogin(credential)
      if (data.statusCode === 403 || data.statusCode === 401) {
        return { success: data.success, errorMessage: data.errorMessage }
      } else {
        commit('AUTH_SUCCESS', {
          isLogedIn: true,
          accessToken: 'Bearer ' + data.data.accessToken
        })
        // set localstorage
        await authenticate.setLoginToken('Bearer ' + data.data.accessToken)
        // get logged user data
        const roleResp = await dispatch('user/getLoggedUserData', null, { root: true })
        return { success: data.success, roleResp }
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  logout ({ commit }) {
    commit('LOGOUT')
    authenticate.setLogout()
    router.push('/login')
  },
  // request a password
  async requestUserPwd ({ commit }, payload) {
    commit('API_DATA_PENDING')
    try {
      const resp = await requestpwd(payload)
      return resp
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // reset pwd
  async resetUserPwd ({ commit }, payload) {
    commit('API_DATA_PENDING')
    try {
      const resp = await pwdReset(payload)
      return resp
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
