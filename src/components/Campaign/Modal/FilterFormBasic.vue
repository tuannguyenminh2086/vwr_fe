<template>
  <div class="vw-campaign__form-group">
    <div class="vw-form__row">
      <b-form-group class="vw-form__group" :label="influencerFilterName.title" label-class="vw-form__label" label-for="campaign-influencer-name">
        <b-form-input id="campaign-influencer-name" class="vw-form__control" placeholder="Enter name of Influencer" :value="influencerFilterName.value" trim @input="handleInputName" @keyup.enter="handleFilter"></b-form-input>
      </b-form-group>
    </div>
    <div class="vw-form__row">
      <b-form-group class="vw-form__group" :label="influencerFilterLink.title" label-class="vw-form__label" label-for="campaign-influencer-link">
        <b-form-input id="campaign-influencer-link" class="vw-form__control" placeholder="Paste link here" :value="influencerFilterLink.value" trim @input="handleInputLink" @keyup.enter="handleFilter"></b-form-input>
      </b-form-group>
    </div>
    <div class="vw-form__row vw-form__row--1-1">
      <b-form-group class="vw-form__group" :label="influencerFilterPlatform.title" label-class="vw-form__label" label-for="campaign-influencer-platform">
        <VWMultiSelect :value="influencerFilterPlatform.value" inputId="campaign-influencer-platform" placeholder="Multi-select Platform" :options="platformOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputPlatform"></VWMultiSelect>
      </b-form-group>
      <div class="vw-form__row vw-form__row--small-gap vw-form__row--1-1">
        <b-form-group class="vw-form__group" label="Audience" label-class="vw-form__label" label-for="campaign-influencer-audience-from">
          <b-form-input id="campaign-influencer-audience-from" class="vw-form__control" placeholder="From" type="number" min="0" :value="influencerFilterAudience.from" :state="audienceState" @input="handleInputAudienceFrom" @keyup.enter="handleFilter"></b-form-input>
        </b-form-group>
        <b-form-group class="vw-form__group" label="To" label-class="vw-form__label vw-form__label--hide" label-for="campaign-influencer-audience-to">
          <b-form-input id="campaign-influencer-audience-to" class="vw-form__control" placeholder="To" type="number" min="0" :value="influencerFilterAudience.to" :state="audienceState" @input="handleInputAudienceTo" @keyup.enter="handleFilter"></b-form-input>
        </b-form-group>
      </div>
    </div>
    <div class="vw-form__row vw-form__row--1-1">
      <b-form-group class="vw-form__group" :label="influencerFilterLevel.title" label-class="vw-form__label" label-for="campaign-influencer-level">
        <VWMultiSelect :value="influencerFilterLevel.value" inputId="campaign-influencer-level" placeholder="Multi-select Level" :options="levelOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputLevel"></VWMultiSelect>
      </b-form-group>
      <div class="vw-form__row vw-form__row--small-gap vw-form__row--1-1">
        <b-form-group class="vw-form__group" label="Avg. Engagement" label-class="vw-form__label" label-for="campaign-influencer-engagement-from">
          <b-form-input id="campaign-influencer-engagement-from" class="vw-form__control" placeholder="From" type="number" min="0" :value="influencerFilterEngagement.from" :state="engagementState" @input="handleInputEngagementFrom" @keyup.enter="handleFilter"></b-form-input>
        </b-form-group>
        <b-form-group class="vw-form__group" label="To" label-class="vw-form__label vw-form__label--hide" label-for="campaign-influencer-engagement-to">
          <b-form-input id="campaign-influencer-engagement-to" class="vw-form__control" placeholder="To" type="number" min="0" :value="influencerFilterEngagement.to" :state="engagementState" @input="handleInputEngagementTo" @keyup.enter="handleFilter"></b-form-input>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import { platformEnum, socialLevelEnum, multiSelectConfigs } from '@/variables'
import {
  FILTER_CAMPAIGN_INFLUENCER,
  UPDATE_CAMPAIGN_FILTER_NAME,
  UPDATE_CAMPAIGN_FILTER_LINK,
  UPDATE_CAMPAIGN_FILTER_PLATFORM,
  UPDATE_CAMPAIGN_FILTER_AUDIENCE_FROM,
  UPDATE_CAMPAIGN_FILTER_AUDIENCE_TO,
  UPDATE_CAMPAIGN_FILTER_LEVEL,
  UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_FROM,
  UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_TO
} from '@/eventBus-types'

export default {
  name: 'campaign-modal-influencer-filter-form-basic',
  props: {
    influencerFilterName: Object,
    influencerFilterLink: Object,
    influencerFilterPlatform: Object,
    influencerFilterAudience: Object,
    influencerFilterLevel: Object,
    influencerFilterEngagement: Object
  },
  components: {
    VWMultiSelect: () => import('@/components/Elements/MultiSelect.vue')
  },
  data () {
    return {
      multiSelectConfigs: multiSelectConfigs,
      platformOptions: platformEnum,
      levelOptions: socialLevelEnum,
      audienceState: null,
      engagementState: null
    }
  },
  methods: {
    handleInputName (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_NAME,
        value: value
      })
    },
    handleInputLink (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_LINK,
        value: value
      })
    },
    handleInputPlatform (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_PLATFORM,
        value: value
      })
    },
    handleInputAudienceFrom (value) {
      // Validation
      this.audienceState = this.validateRange(value, this.influencerFilterAudience.to)
      // Emit event
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_AUDIENCE_FROM,
        value: value
      })
    },
    handleInputAudienceTo (value) {
      // Validation
      this.audienceState = this.validateRange(this.influencerFilterAudience.from, value)
      // Emit event
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_AUDIENCE_TO,
        value: value
      })
    },
    handleInputLevel (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_LEVEL,
        value: value
      })
    },
    handleInputEngagementFrom (value) {
      // Validation
      this.engagementState = this.validateRange(value, this.influencerFilterEngagement.to)
      // Emit event
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_FROM,
        value: value
      })
    },
    handleInputEngagementTo (value) {
      // Validation
      this.engagementState = this.validateRange(this.influencerFilterEngagement.from, value)
      // Emit event
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_TO,
        value: value
      })
    },
    validateRange (from, to) {
      if (!from || !to) {
        return true
      }
      if (Number(from) <= Number(to)) {
        return true
      } else {
        return false
      }
    },
    handleFilter () {
      this.$geb.emit({
        id: FILTER_CAMPAIGN_INFLUENCER
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
