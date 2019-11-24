import api from './api'
import { env } from '@/config'

const clientAPI = {
  base: `${env.API.CLIENTS}`,
  influencer: `${env.API.INFLUENCER}`
}
// get list of clients
export const getList = options => {
  return api.get({
    url: `${clientAPI.base}?${options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// create a Client
export const createClient = data => {
  return api.post({
    url: `${clientAPI.base}`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// delete a Client
export const deleteClient = id => {
  return api.delete({
    url: `${clientAPI.base}/${id}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get client detail
export const getById = id => {
  return api.get({
    url: `${clientAPI.base}/${id}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// create a user of a client
export const createUserofClient = data => {
  return api.post({
    url: `${clientAPI.base}/new_user/${data.cid}`,
    data: data.payload
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get user of a client
export const getUsersByCID = cid => {
  return api.get({
    url: `${clientAPI.base}/users/${cid}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// remove user of a client
export const removeUsersByCID = payload => {
  return api.get({
    url: `${clientAPI.base}/remove_user/${payload.cid}/${payload.sid}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// deactive user of client
export const deactiveUsersByCID = payload => {
  return api.get({
    url: `${clientAPI.base}/inactive_user/${payload.cid}/${payload.sid}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get report by Client ID
export const getReportByCID = cid => {
  return api.get({
    url: `${clientAPI.base}/${cid}/reports`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get campaign by client ID
export const getCampaignByCID = cid => {
  return api.get({
    url: `${clientAPI.base}/${cid}/campaigns`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get influencer by client ID
export const getInfluencerByCID = cid => {
  return api.get({
    url: `${clientAPI.influencer}/client_id/${cid}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// delete influencer
export const deleteInfluencer = id => {
  return api.delete({
    url: `${clientAPI.influencer}/${id}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
