import {
  RETRIEVE_ROLES,
  RETRIEVE_PERMISSIONS,
  API_DATA_PENDING,
  API_DATA_FAILURE,
  API_DATA_SUCCESS
} from '../action-types'

import {
  getList,
  getListPermissions
} from '../../services/rolesServices'

import { size, uniqWith, isEqual } from 'lodash'

const state = {
  items: [],
  permissions: null,
  status: '',
  loading: false,
  create: null,
  detail: null,
  totalDocs: 0,
  limit: 0,
  offset: 0
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
  [RETRIEVE_ROLES] (state, payload) {
    let roles = payload.data
    if (size(state.items) < 1) {
      roles.forEach(role => {
        let { createdAt, name, permissions, updatedAt, _id, status } = role
        let obj = {
          permissions,
          createdAt,
          name,
          updatedAt,
          _id,
          status: (status === '1')
        }
        state.items.push(obj)
      })
      state.items = uniqWith(state.items, isEqual)
      state.totalDocs = size(state.items)
    }
  },
  [RETRIEVE_PERMISSIONS] (state, payload) {
    let { data } = payload
    state.permissions = data
  }
}

const actions = {
  async fetchAllRoles ({ commit }, options) {
    commit('API_DATA_PENDING')
    let opts = options || ''
    try {
      let { data } = await getList(opts)
      commit('RETRIEVE_ROLES', data)
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async fetchAllPermisions ({ commit }, options) {
    commit('API_DATA_PENDING')
    let opts = options || ''
    try {
      let { data } = await getListPermissions(opts)
      commit('RETRIEVE_PERMISSIONS', data)
      return data
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
