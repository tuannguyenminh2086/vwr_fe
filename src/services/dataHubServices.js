import api from './api'
import { env } from '@/config'

const dataHubAPI = {
  base: `${env.API.DATAHUB}`
}

// get data by id
export const get = async clientId => {
  try {
    let response = ''
    if (clientId !== '') {
      response = await api.get({
        url: `${dataHubAPI.base}/${clientId}`
      })
    } else {
      response = await api.get({
        url: `${dataHubAPI.base}/data_hub_type`
      })
    }
    return await Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}
// get category by ids
export const getDataCategories = payload => {
  return api.get({
    url: `${dataHubAPI.base}/data_hub_category`,
    data: payload
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// add category by type
export const addCatebyType = data => {
  return api.post({
    url: `${dataHubAPI.base}/data_hub_type/add_category`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

// get cate by typeid
export const getCatebyType = async typeId => {
  try {
    let response = await api.get({
      url: `${dataHubAPI.base}/data_hub_type/${typeId}/data_hub_category`
    })
    return await Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}
