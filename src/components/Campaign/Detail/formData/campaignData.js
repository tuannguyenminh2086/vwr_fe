import { cloneDeep } from 'lodash'

export default class CampaignData {
  constructor () {
    this.name = ''
    this.brand = null
    this.influencerList = []
  }
  getDataToSubmit () {
    let influencers = this.influencerList.map(x => ({
      social: x._id,
      influencer: x.influencer._id,
      cost: x.localCost
    }))
    return {
      name: this.name,
      brand: this.brand._id,
      influencers: influencers
    }
  }
  toggleEditCost (id, value) {
    let idx = this.influencerList.findIndex(x => x._id === id)
    if (idx >= 0) {
      let selected = cloneDeep(this.influencerList[idx])
      selected.isEditingCost = value
      this.influencerList.splice(idx, 1, selected)
    }
  }
  updateCost (payload) {
    let idx = this.influencerList.findIndex(x => x._id === payload.id)
    if (idx >= 0) {
      let selected = cloneDeep(this.influencerList[idx])
      selected.localCost = Number(payload.value)
      this.influencerList.splice(idx, 1, selected)
    }
  }
  removeInfluencer (id) {
    let selectedIdx = this.influencerList.findIndex(x => x._id === id)
    selectedIdx >= 0 && this.influencerList.splice(selectedIdx, 1)
  }
}
