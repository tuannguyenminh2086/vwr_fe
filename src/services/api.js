import store from '@/store'
import axios from 'axios'
import { env } from '@/config'
import router from '@/router'
import auth from '../helper/authenticate'

let definition = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

let _combineHeader = (headers) => {
  let obj = Object.assign(definition, {})
  if (store.state.auth && store.state.auth.accessToken) {
    obj.headers['Authorization'] = store.state.auth.accessToken
    // obj.headers['Authorization'] = auth.getAccessToken() || ''
  }
  for (let prop in headers) {
    obj.headers[prop] = headers[prop]
  }
  return obj
}

let _generateParams = (obj) => {
  return Object.keys(obj).map((key) => {
    return key + '=' + encodeURIComponent(obj[key])
  }).join('&')
}

export default {
  install () {
    axios.defaults.baseURL = env.API_SERVER
    for (let name in definition.headers) {
      axios.defaults.headers.common[name] = definition.headers[name]
    }
    // In 30 second
    axios.defaults.timeout = 60000

    // Config Interceptors
    axios.interceptors.response.use((config) => {
      return config
    }, (error) => {
      if (error.response && error.response.status === 401) {
        store.commit('auth/LOGOUT')
        store.commit('user/REMOVE_LOGGED_USER')
        // clear storage
        auth.setLogout()
        // move to login
        router.push({ name: 'login' })
      }
      return error.response
    })
  },
  post: obj => {
    return axios.post(obj.url, JSON.stringify(obj.data), _combineHeader(obj.headers))
  },
  get: obj => {
    return axios.get(obj.url + (obj.data ? ('?' + _generateParams(obj.data)) : ''), _combineHeader(obj.headers))
  },
  put: obj => {
    return axios.put(obj.url, JSON.stringify(obj.data), _combineHeader(obj.headers))
  },
  patch: obj => {
    return axios.patch(obj.url, JSON.stringify(obj.data), _combineHeader(obj.headers))
  },
  delete: obj => {
    return axios.delete(obj.url + (obj.data ? ('?' + _generateParams(obj.data)) : ''), _combineHeader(obj.headers))
  }
}
