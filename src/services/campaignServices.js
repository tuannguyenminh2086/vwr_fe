import api from './api'
import { env } from '@/config'
import qs from 'qs'

const campaignAPI = {
  base: `${env.API.CAMPAIGN}`,
  search: 'social/search-campaign'
}

export const get = campaignId => {
  return api.get({
    url: `${campaignAPI.base}/${campaignId}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getList = options => {
  return api.get({
    url: `${campaignAPI.base}?${options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const create = data => {
  return api.post({
    url: `${campaignAPI.base}`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const update = data => {
  return api.put({
    url: `${campaignAPI.base}/${data.campaignId}`,
    data: data.data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const remove = campaignId => {
  return api.delete({
    url: `${campaignAPI.base}/${campaignId}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const search = options => {
  let strOptions = qs.stringify(options, { encode: false, skipNulls: true })
  return api.get({
    url: `${campaignAPI.search}?${strOptions}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getInfluencers = data => {
  return api.get({
    url: `${campaignAPI.base}/${data.campaignId}/influencer?${data.options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getAllInfluencers = campaignId => {
  return api.get({
    url: `${campaignAPI.base}/${campaignId}/influencer/all`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
