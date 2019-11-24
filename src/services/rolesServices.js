import api from './api'
import { env } from '@/config'

const rolesAPI = {
  base: `${env.API.USER_ROLE}`,
  permissions: `${env.API.USER_PERMISSION}`
}
// get list of roles
export const getList = options => {
  return api.get({
    url: `${rolesAPI.base}?${options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// post a role
export const create = data => {
  return api.post({
    url: `${rolesAPI.base}`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get role by id
export const getById = async roleId => {
  try {
    const response = await api.get({
      url: `${rolesAPI.base}/${roleId}`
    })
    return await Promise.resolve(response)
  } catch (error) {
    return error
  }
}

// get permission List

export const getListPermissions = options => {
  return api.get({
    url: `${env.API.USER_PERMISSION}?${options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
