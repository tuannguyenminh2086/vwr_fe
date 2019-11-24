import api from './api'
import { env } from '@/config'

const userAPI = {
  base: `${env.API.USER}`,
  auth: `${env.API.AUTH}`
}
// AUTH
// get Login
export const doLogin = credential => {
  return api.post({
    url: `${userAPI.auth}/login`,
    data: credential
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get Logout
export const doLogout = () => {
  return api.post({
    url: `${userAPI.auth}/logout`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// -- END AUTH -- //
// get list
export const getList = options => {
  return api.get({
    url: `${userAPI.base}?${options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get logged user data
export const getLoggedUserData = () => {
  return api.get({
    url: `${userAPI.base}/current-user`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get user by id
export const getById = async userId => {
  try {
    const response = await api.get({
      url: `${userAPI.base}/${userId}`
    })
    return await Promise.resolve(response)
  } catch (error) {
    return error
  }
}
// create a user
export const create = data => {
  return api.post({
    url: `${userAPI.base}`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// update a user
export const update = user => {
  return api.put({
    url: `${userAPI.base}/${user._id}`,
    data: user
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// forgot password
export const requestpwd = data => {
  return api.post({
    url: `${userAPI.auth}/request_password_reset`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// password reset
export const pwdReset = data => {
  return api.post({
    url: `${userAPI.auth}/password_reset`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
