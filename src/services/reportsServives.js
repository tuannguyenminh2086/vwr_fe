import api from './api'
import { env } from '@/config'

const reportsAPI = {
  base: `${env.API.REPORT}`,
  getPost: 'social/post'
}
// get list of reports
export const getList = options => {
  return api.get({
    url: `${reportsAPI.base}?${options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get post social data
export const getPost = options => {
  return api.get({
    url: `${reportsAPI.getPost}?link=${options}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// create report
export const create = data => {
  return api.post({
    url: `${reportsAPI.base}`,
    data: data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// delete
export const remove = reportId => {
  return api.delete({
    url: `${reportsAPI.base}/${reportId}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// update
export const update = payload => {
  return api.put({
    url: `${reportsAPI.base}/${payload.reportId}`,
    data: payload.data
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get report by id
export const getById = reportId => {
  return api.get({
    url: `${reportsAPI.base}/${reportId}`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
// get report by id
export const getPostsById = reportId => {
  return api.get({
    url: `${reportsAPI.base}/${reportId}/post`
  }).then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
