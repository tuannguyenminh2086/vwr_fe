import { env } from '@/config'
import api from '@/services/api'
import store from '@/store'
import {
  GET_FILE,
  UPLOAD_FILE
} from '@/store/action-types'

const fileAPI = {
  base: `${env.API.FILE}`,
  upload: `${env.API.FILE}/upload`
}
const actions = {
  [GET_FILE] ({ commit }, payload) {
    return api.get({
      url: `${fileAPI.base}/${payload._id}`
    }).then(response => {
      if (response && response.data.success) {
        return Promise.resolve(response)
      }
    }).catch(error => {
      return Promise.reject(error)
    })
  },

  // Can not upload file by axios, so we use fetch for this case
  [UPLOAD_FILE] ({ commit }, payload) {
    let option = {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: store.state.auth.accessToken
      }
    }
    return fetch(
      `${env.API_SERVER}${fileAPI.upload}`,
      option
    ).then(response => {
      return Promise.resolve(response.json())
    }).catch(error => { return Promise.reject(error) })
  }
}
export default {
  namespaced: true,
  actions
}
