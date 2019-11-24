import api from './api'
import { env } from '@/config'

const addressAPI = {
  getCityList: `${env.API.ADDRESS}/city`,
  getDistrictList: `${env.API.ADDRESS}/district`,
  getWardList: `${env.API.ADDRESS}/ward`
}

export const getCityList = () => {
  return api.get({
    url: addressAPI.getCityList
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getDistrictList = cityId => {
  return api.get({
    url: `${addressAPI.getDistrictList}?cityId=${cityId}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getWardList = data => {
  return api.get({
    url: `${addressAPI.getWardList}?cityId=${data.cityId}&districtId=${data.districtId}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
