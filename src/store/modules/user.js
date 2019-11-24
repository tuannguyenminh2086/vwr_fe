import {
  API_DATA_PENDING,
  API_DATA_FAILURE,
  API_DATA_SUCCESS,
  GET_LOGGED_USER,
  REMOVE_LOGGED_USER
} from '../action-types'

import {
  getById,
  update,
  getLoggedUserData
} from '../../services/userServives'

import authenticate from '../../helper/authenticate'
import { head } from 'lodash'

const state = {
  currentUserEmail: '',
  currentUserFullName: '',
  currentUser: {},
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
  [GET_LOGGED_USER] (state, user) {
    state.currentUserEmail = user.email
    state.currentUserFullName = user.fullName
    let { avatar, client, createdAt, email, fullName, roles, status, updatedAt, _id } = user
    state.currentUser = {
      _id,
      avatar,
      client,
      createdAt,
      email,
      fullName,
      roles,
      roleName: head(roles).name,
      status: (status === 1),
      updatedAt
    }
  },
  [REMOVE_LOGGED_USER] (state) {
    state.currentUserEmail = ''
    state.currentUserFullName = ''
    state.currentUser = {}
  }
}

const actions = {
  async getLoggedUserData ({ commit }) {
    commit('API_DATA_PENDING')
    try {
      const { data: { data } } = await getLoggedUserData()
      if (data) {
        commit('GET_LOGGED_USER', data)
        let payload = {
          email: data.email,
          fullName: data.fullName,
          roleName: head(data.roles).name,
          company: {
            client_id: '',
            name: '',
            _id: ''
          }
        }
        if (payload.roleName === 'Super Admin') {
          payload.company.client_id = 'VWR'
          payload.company.name = 'VIRALWORKS'
          payload.company._id = ''
        } else {
          payload.company.client_id = data.client.client_id
          payload.company.name = data.client.name
          payload.company._id = data.client._id
        }
        await authenticate.setLoggedToken(payload)
        return head(data.roles).name
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // logout user
  removeLoggedUser ({ commit }) {
    commit('REMOVE_LOGGED_USER')
    authenticate.setLogout()
  },
  // get user detail by id
  async getUserById ({ commit }, id) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await getById(id)
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // update a user
  async updateUserById ({ commit }, payload) {
    commit('API_DATA_PENDING')
    try {
      const resp = await update(payload)
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
