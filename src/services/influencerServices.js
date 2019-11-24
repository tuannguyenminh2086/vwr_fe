import api from './api'
import { env } from '@/config'

const influencerAPI = {
  base: `${env.API.INFLUENCER}`
}

export const invite = data => {
  return api.post({
    url: `${influencerAPI.base}/invite`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const get = influencerId => {
  return api.get({
    url: influencerId ? `${influencerAPI.base}/${influencerId}` : `${influencerAPI.base}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const update = influencer => {
  return api.put({
    url: `${influencerAPI.base}/${influencer._id}`,
    data: influencer
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const updateStatus = influencer => {
  return api.patch({
    url: `${influencerAPI.base}/${influencer._id}`,
    data: influencer
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const remove = influencerId => {
  return api.delete({
    url: `${influencerAPI.base}/${influencerId}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getList = url => {
  return api.get({
    url: url
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getSocials = influencerId => {
  return api.get({
    url: `${influencerAPI.base}/${influencerId}/socials`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getSocialsPost = data => {
  return api.get({
    url: `${influencerAPI.base}/${data.influencerId}/${data.platform}-post?limit=${data.limit}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
