import {
  INVITE_INFLUENCER,
  GET_INFLUENCER,
  UPDATE_INFLUENCER,
  UPDATE_STATUS_INFLUENCER,
  DELETE_INFLUENCER,
  GET_LIST_INFLUENCER,
  GET_SOCIALS_INFLUENCER,
  GET_SOCIALS_POST
} from './../action-types'

import {
  invite,
  get,
  update,
  updateStatus,
  remove,
  getList,
  getSocials,
  getSocialsPost
} from '@/services/influencerServices'

const state = {}

const mutations = {}

const actions = {
  [INVITE_INFLUENCER] (ctx, data) {
    return invite(data)
  },
  [GET_INFLUENCER] (ctx, influencerId) {
    return get(influencerId)
  },
  [UPDATE_INFLUENCER] (ctx, influencer) {
    return update(influencer)
  },
  [UPDATE_STATUS_INFLUENCER] (ctx, influencer) {
    return updateStatus(influencer)
  },
  [DELETE_INFLUENCER] (ctx, influencerId) {
    return remove(influencerId)
  },
  [GET_LIST_INFLUENCER] (ctx, url) {
    return getList(url)
  },
  [GET_SOCIALS_INFLUENCER] (ctx, influencerId) {
    return getSocials(influencerId)
  },
  [GET_SOCIALS_POST] (ctx, data) {
    return getSocialsPost(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
