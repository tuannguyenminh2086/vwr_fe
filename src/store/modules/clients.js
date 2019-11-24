import {
  RETRIEVE_CLIENTS,
  RETRIVE_CLIENT_STAFFS,
  ADD_CLIENT,
  SET_CLIENT_DETAIL,
  API_DATA_PENDING,
  API_DATA_FAILURE,
  API_DATA_SUCCESS,
  API_DATA_RESET,
  GET_CLIENT_REPORTS,
  GET_CLIENT_CAMPAIGNS,
  UPDATE_CLIENT_ADMIN_ROLE,
  GET_CLIENT_INFLUENCERS
} from '../action-types'
import {
  getList,
  createClient,
  deleteClient,
  getById,
  createUserofClient,
  getUsersByCID,
  getReportByCID,
  getCampaignByCID,
  removeUsersByCID,
  deactiveUsersByCID,
  getInfluencerByCID,
  deleteInfluencer
} from '../../services/clientServives'
import { filter } from 'lodash'

const state = {
  items: [],
  status: '',
  loading: false,
  create: null,
  detail: null,
  staffs: [],
  totalDocs: 0,
  limit: 0,
  offset: 0,
  client: {
    campaigns: null,
    reports: null,
    influencers: null,
    hasAdminRole: false
  }
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
  [API_DATA_RESET] (state) {
    state.staffs = []
    state.items = []
    state.status = ''
    state.loading = false
    state.create = null
    state.detail = null
    state.totalDocs = 0
    state.limit = 0
    state.offset = 0
    state.client.campaigns = null
    state.client.reports = null
    state.client.influencers = null
    state.client.hasAdminRole = false
  },
  [RETRIEVE_CLIENTS] (state, payload) {
    let clients = payload.data
    state.items = []
    clients.forEach(function (client) {
      let { createdBy, createdAt, name, status, updatedAt, _id } = client
      let obj = {
        client_id: client.client_id,
        createdBy,
        createdAt,
        name,
        updatedAt,
        _id,
        status: (status === 1)
      }
      state.items.push(obj)
    })
  },
  [ADD_CLIENT] (state, payload) {
    if (payload) {
      state.items.push(payload)
    }
  },
  [SET_CLIENT_DETAIL] (state, payload) {
    if (payload) {
      state.staffs = []
      state.detail = payload.data
    }
  },
  [RETRIVE_CLIENT_STAFFS] (state, payload) {
    let rolesGeneral = payload.roles
    let staffs = filter(payload.staffs, function (o) { return o.status !== 3 })
    let result = []
    state.staffs = []
    staffs.forEach(function (staff) {
      let { avatar, client, createdAt, email, fullName, updatedAt, _id, status, roles } = staff
      let nRoles = []
      roles.map(ele => ele._id).forEach(function (id) {
        nRoles = filter(rolesGeneral, role => role._id === id)
      })
      let obj = {
        avatar,
        client,
        createdAt,
        email,
        fullName,
        updatedAt,
        _id,
        roles: nRoles,
        status: (status === 1)
      }
      result.push(obj)
    })
    state.staffs = result
  },
  [GET_CLIENT_REPORTS] (state, payload) {
    if (payload) {
      state.client.reports = []
      state.client.reports = payload.data
    }
  },
  [GET_CLIENT_CAMPAIGNS] (state, payload) {
    state.client.campaigns = []
    state.client.campaigns = payload.data
  },
  [GET_CLIENT_INFLUENCERS] (state, payload) {
    state.client.influencers = []
    state.client.influencers = payload.data
  },
  [UPDATE_CLIENT_ADMIN_ROLE] (state, payload) {
    state.client.hasAdminRole = payload
  }
}

const actions = {
  // reset data
  resetData ({ commit }) {
    commit('API_DATA_RESET')
  },
  // fetch all clients
  async fetchAllClients ({ commit }, options) {
    commit('API_DATA_RESET')
    commit('API_DATA_PENDING')
    let opts = options || ''
    try {
      let { data, status } = await getList(opts)
      if (status === 200) {
        commit('RETRIEVE_CLIENTS', data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // create a Client
  async create ({ commit, dispatch }, payload) {
    dispatch('resetData')
    commit('API_DATA_PENDING')
    try {
      let { status } = await createClient(payload)
      if (status === 200) {
        commit('API_DATA_SUCCESS')
        // commit('ADD_CLIENT', data.data)
        await dispatch('fetchAllClients')
        return true
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // delete a Client
  async removeClientById ({ commit, dispatch }, id) {
    commit('API_DATA_PENDING')
    try {
      let { status } = await deleteClient(id)
      if (status === 200) {
        commit('API_DATA_SUCCESS')
        return status
      }
      await dispatch('fetchAllClients')
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // get client detail by id
  async getClientById ({ commit, dispatch }, id) {
    dispatch('resetData')
    commit('API_DATA_PENDING')
    try {
      let { data } = await getById(id)
      commit('SET_CLIENT_DETAIL', data)
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // create User for Client
  async createUserForClient ({ commit }, payload) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await createUserofClient(payload)
      return data
      // commit('SET_CLIENT_DETAIL', data)
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // get users by client id
  async getStaffByCId ({ commit, dispatch }, id) {
    dispatch('resetData')
    commit('API_DATA_PENDING')
    try {
      let staffs = await getUsersByCID(id)
      // retrieve Permissions
      let roles = await dispatch('roles/fetchAllRoles', null, { root: true })
      let payload = Object.assign({}, { staffs: staffs.data.data, roles: roles.data })
      commit('RETRIVE_CLIENT_STAFFS', payload)
      return staffs
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // delete a Staff
  async removeStaffById ({ commit, dispatch }, payload) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await removeUsersByCID(payload)
      await dispatch('getStaffByCId', payload.cid)
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // delete a Staff
  async inactiveStaffById ({ commit }, payload) {
    // commit('API_DATA_PENDING')
    try {
      let { data } = await deactiveUsersByCID(payload)
      // await dispatch('getStaffByCId', payload.cid)
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // get report by Client ID
  async getReportByCID ({ commit }, cid) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await getReportByCID(cid)
      if (data.success) {
        commit('GET_CLIENT_REPORTS', data)
      }
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // get campaign by client ID
  async getCampaignByCID ({ commit }, cid) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await getCampaignByCID(cid)
      if (data.success) {
        commit('GET_CLIENT_CAMPAIGNS', data)
      }
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // get campaign by client ID
  async getInfluencersByCID ({ commit }, cid) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await getInfluencerByCID(cid)
      if (data.success) {
        commit('GET_CLIENT_INFLUENCERS', data)
      }
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async deleteInfluencerID ({ commit }, id) {
    commit('API_DATA_PENDING')
    try {
      let res = await deleteInfluencer(id)
      console.log(res)
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  // set admin role in client
  updateClientAdminRole ({ commit }, payload) {
    commit('UPDATE_CLIENT_ADMIN_ROLE', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
