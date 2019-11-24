import api from '@/services/api'
import { env } from '@/config'
import { uniqBy } from 'lodash'
import {
  UPDATE_DATA_HUB,
  SET_DATA_HUB,
  SET_CATE_ITEM
} from './../mutation-types'

import {
  API_DATA_PENDING,
  API_DATA_SUCCESS,
  API_DATA_FAILURE,
  GET_DATA_HUB,
  GET_DATA_HUB_BY_CLIENT,
  UPDATE_DATA_HUB_LOADING
} from './../action-types.js'

import {
  get,
  addCatebyType,
  // getDataCategories,
  getCatebyType
} from '../../services/dataHubServices'

const dataHubAPI = {
  get: `${env.API.DATAHUB}`
}

const state = {
  dataHub: {},
  typeDetail: {},
  error: '',
  loading: true,
  kid: [],
  style: [],
  topicOfInterest: [],
  age: [],
  brand: [],
  occupation: [],
  fanLocation: [],
  // new
  dataHubByClient: [],
  status: {}
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
  [UPDATE_DATA_HUB] (state, payload) {
    payload.forEach(dataHubItem => {
      if (dataHubItem.keys.some(key => key === 'Kid')) {
        state.kid = dataHubItem.data
      } else if (dataHubItem.keys.some(key => key === 'Style')) {
        state.style = dataHubItem.data
      } else if (dataHubItem.keys.some(key => key === 'Topic of interest')) {
        state.topicOfInterest = dataHubItem.data
      } else if (dataHubItem.keys.some(key => key === 'Age')) {
        state.age = dataHubItem.data
      } else if (dataHubItem.keys.some(key => key === 'Brand Ambassador')) {
        state.brand = dataHubItem.data
      } else if (dataHubItem.keys.some(key => key === 'Occupation')) {
        state.occupation = dataHubItem.data
      } else if (dataHubItem.keys.some(key => key === 'Fan Location')) {
        state.fanLocation = dataHubItem.data
      }
    })
  },
  [SET_DATA_HUB] (state, payload) {
    state.dataHub = Object.assign({}, payload)
  },
  [SET_CATE_ITEM] (state, payload) {
    state.typeDetail = Object.assign({}, payload)
  },
  [UPDATE_DATA_HUB_LOADING] (state, payload) {
    state.loading = payload
  },
  // new
  [GET_DATA_HUB_BY_CLIENT] (state, payload) {
    let tmpArr = []
    payload.forEach(item => {
      if (item.keys.some(key => key === env.DATAHUB.TYPE_O1)) {
        tmpArr.push(item)
      } else if (item.keys.some(key => key === env.DATAHUB.TYPE_O2)) {
        tmpArr.push(item)
      } else if (item.keys.some(key => key === env.DATAHUB.TYPE_03)) {
        tmpArr.push(item)
      } else if (item.keys.some(key => key === env.DATAHUB.TYPE_04)) {
        tmpArr.push(item)
      }
    })
    state.dataHubByClient = uniqBy(tmpArr, 'label')
  }
}

const actions = {
  [GET_DATA_HUB] ({ commit }) {
    return api.get({
      url: dataHubAPI.get
    }).then(response => {
      if (response && response.data.success) {
        // Update data hub
        commit(UPDATE_DATA_HUB, response.data.data)
        commit(SET_DATA_HUB, response.data.data)
        // Deactive Indicator
        commit(UPDATE_DATA_HUB_LOADING, false)
      }
    })
  },
  async initTypeDetail ({ commit }, typeId) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await getCatebyType(typeId)
      return data
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async addNewCate ({ commit }, payload) {
    commit('API_DATA_PENDING')
    try {
      let { data } = await addCatebyType(payload)
      if (data.statusCode === 200) {
        return data.data
      }
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async deleteNewCate ({ commit }, payload) {
    // let res = await functionAddtoDB(payload);
    let res = true
    if (res) {
      commit('UPDATE_DATA_HUB', res)
      commit('SET_DATA_HUB', res)
    }
  },
  async updateAType ({ commit }, payload) {
    let res = true
    if (res) {
      commit('UPDATE_DATA_HUB', res)
      commit('SET_DATA_HUB', res)
    }
  },
  async getDataHub ({ commit }, clientId) {
    commit('API_DATA_PENDING')
    let param = clientId || ''
    try {
      let { data, status } = await get(param)
      if (status === 200) {
        commit('GET_DATA_HUB_BY_CLIENT', data.data)
      }
      // console.log(data)
    } catch (err) {
      console.log(err)
    } finally {
      commit('API_DATA_SUCCESS')
    }
  },
  async getDataHubByClient ({ commit }) {
    commit('API_DATA_PENDING')
    try {
      let { data, status } = await get('')
      if (status === 200) {
        // commit('GET_DATA_HUB_BY_CLIENT', data.data)
        commit(UPDATE_DATA_HUB, data.data)
        commit(SET_DATA_HUB, data.data)
      }
      // console.log(data)
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
