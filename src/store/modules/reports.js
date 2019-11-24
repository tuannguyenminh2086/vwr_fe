import {
  RETRIEVE_REPORTS,
  SET_REPORT_DETAIL,
  API_DATA_PENDING,
  API_DATA_FAILURE,
  API_DATA_SUCCESS
} from '../action-types'
import {
  getList,
  getPost,
  create,
  remove,
  update,
  getById,
  getPostsById
} from '../../services/reportsServives'

const state = {
  items: null,
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
  [RETRIEVE_REPORTS] (state, payload) {
    let { data } = payload
    state.items = []
    state.items = data.docs
    state.totalDocs = data.totalDocs
    state.limit = data.limit
    state.offset = data.offset
  },
  [SET_REPORT_DETAIL] (state, payload) {
    state.detail = Object.assign({}, payload)
  }
}

const actions = {
  // fetch all reports
  async fetchAllReports ({ commit }, options) {
    commit('API_DATA_PENDING')
    let opts = options || ''
    try {
      let { data, status } = await getList(opts)
      if (status === 200) {
        commit('RETRIEVE_REPORTS', data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async createReport ({ commit }, payload) {
    commit('API_DATA_PENDING')
    try {
      let { status } = await create(payload)
      if (status === 200) {
        commit('API_DATA_SUCCESS')
        return true
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async removeReportById ({ commit, dispatch }, rid) {
    commit('API_DATA_PENDING')
    try {
      let data = await remove(rid)
      console.log(data)
      if (status === 200) {
        commit('API_DATA_SUCCESS')
        return status
      }
      // await dispatch('fetchAllReports')
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async updateReportById ({ commit }, payload) {
    commit('API_DATA_PENDING')
    try {
      let { status } = await update(payload)
      if (status === 200) {
        return true
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async getReportById ({ commit, dispatch }, rid) {
    commit('API_DATA_PENDING')
    try {
      let { status, data } = await getById(rid)
      if (status === 200) {
        let res = await dispatch('getAllPostsById', rid)
        if (res) {
          let payload = Object.assign({}, { post: res.data, item: data.data })
          commit('SET_REPORT_DETAIL', payload)
          return true
        } else { return false }
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async getAllPostsById ({ commit }, rid) {
    commit('API_DATA_PENDING')
    try {
      let { status, data } = await getPostsById(rid)
      return (status === 200) ? data : false
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async getPostData ({ commit }, payload) {
    let res = await getPost(payload)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
