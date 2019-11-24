import {
  UPDATE_BREADCRUMB,
  ADD_CHILD_BREADCRUMB
} from './../action-types'

import { size, isEmpty } from 'lodash'

const state = {
  listBreadcrumb: []
}

const mutations = {
  [UPDATE_BREADCRUMB] (state, payload) {
    state.listBreadcrumb = payload
  },
  [ADD_CHILD_BREADCRUMB] (state, payload) {
    let length = size(state.listBreadcrumb)
    if (!isEmpty(state.listBreadcrumb) && length > 1) {
      state.listBreadcrumb[length - 1].label = payload.label
    }
  }
}

const actions = {
  [ADD_CHILD_BREADCRUMB] ({ commit }, payload) {
    return commit(ADD_CHILD_BREADCRUMB, payload)
  },
  [UPDATE_BREADCRUMB] ({ commit }, payload) {
    return commit(UPDATE_BREADCRUMB, payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
