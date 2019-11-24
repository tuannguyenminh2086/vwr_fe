import {
  GET_CAMPAIGN,
  GET_LIST_CAMPAIGN,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  SEARCH_CAMPAIGN,
  GET_CAMPAIGN_INFLUENCERS,
  GET_ALL_CAMPAIGN_INFLUENCERS
} from './../action-types'
import {
  get,
  getList,
  create,
  update,
  remove,
  search,
  getInfluencers,
  getAllInfluencers
} from '@/services/campaignServices'

const state = {}

const mutations = {}

const actions = {
  [GET_CAMPAIGN] (ctx, campaignId) {
    return get(campaignId)
  },
  [GET_LIST_CAMPAIGN] (ctx, options) {
    return getList(options)
  },
  [CREATE_CAMPAIGN] (ctx, data) {
    return create(data)
  },
  [UPDATE_CAMPAIGN] (ctx, data) {
    return update(data)
  },
  [DELETE_CAMPAIGN] (ctx, campaignId) {
    return remove(campaignId)
  },
  [SEARCH_CAMPAIGN] (ctx, options) {
    return search(options)
  },
  [GET_CAMPAIGN_INFLUENCERS] (ctx, data) {
    return getInfluencers(data)
  },
  [GET_ALL_CAMPAIGN_INFLUENCERS] (ctx, campaignId) {
    return getAllInfluencers(campaignId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
