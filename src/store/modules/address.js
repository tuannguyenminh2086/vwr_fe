import {
  GET_CITY_LIST,
  GET_DISTRICT_LIST,
  GET_WARD_LIST,
  UPDATE_CITY_LIST,
  UPDATE_DISTRICT_LIST,
  UPDATE_WARD_LIST
} from './../action-types'
import {
  getCityList,
  getDistrictList,
  getWardList
} from '@/services/addressServices'

const state = {
  cityList: [],
  districtList: [],
  wardList: []
}

const mutations = {
  [UPDATE_CITY_LIST] (state, payload) {
    state.cityList = payload
  },
  [UPDATE_DISTRICT_LIST] (state, payload) {
    state.districtList = payload
  },
  [UPDATE_WARD_LIST] (state, payload) {
    state.wardList = payload
  }
}
const actions = {
  async [GET_CITY_LIST] ({ commit }) {
    try {
      let response = await getCityList()
      if (response && response.data.success) {
        commit(UPDATE_CITY_LIST, response.data.data)
      }
      return Promise.resolve(response)
    } catch (error) {
      console.log('Get City List Error:', error)
      return Promise.reject(error)
    }
  },
  async [GET_DISTRICT_LIST] ({ commit }, cityId) {
    try {
      let response = await getDistrictList(cityId)
      if (response && response.data.success) {
        commit(UPDATE_DISTRICT_LIST, response.data.data)
      }
      return Promise.resolve(response)
    } catch (error) {
      console.log('Get District List Error:', error)
      return Promise.reject(error)
    }
  },
  async [GET_WARD_LIST] ({ commit }, data) {
    try {
      let response = await getWardList(data)
      if (response && response.data.success) {
        commit(UPDATE_WARD_LIST, response.data.data)
      }
      return Promise.resolve(response)
    } catch (error) {
      console.log('Get Ward List Error:', error)
      return Promise.reject(error)
    }
  },
  [UPDATE_CITY_LIST] ({ commit }, payload) {
    commit(UPDATE_CITY_LIST, payload)
  },
  [UPDATE_DISTRICT_LIST] ({ commit }, payload) {
    commit(UPDATE_DISTRICT_LIST, payload)
  },
  [UPDATE_WARD_LIST] ({ commit }, payload) {
    commit(UPDATE_WARD_LIST, payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
