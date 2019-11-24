<template>
  <div class="vw-campaign__form-group">
    <b-button v-b-toggle.campaign-filter-form-advance class="vw-button vw-button--link-primary vw-button--toggle vw-campaign__form-group-toggle">Advanced</b-button>
    <b-collapse id="campaign-filter-form-advance">
      <div class="vw-form__row vw-form__row--1-1">
        <b-form-group class="vw-form__group" :label="influencerFilterTopic.title" label-class="vw-form__label" label-for="campaign-influencer-topic">
          <VWMultiSelect :value="influencerFilterTopic.value" inputId="campaign-influencer-topic" placeholder="Multi-select Topic" :options="topicOfInterestOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputTopic"></VWMultiSelect>
        </b-form-group>
        <b-form-group class="vw-form__group" :label="influencerFilterLocation.title" label-class="vw-form__label" label-for="campaign-influencer-location">
          <VWMultiSelect :value="influencerFilterLocation.value" inputId="campaign-influencer-location" placeholder="Multi-select Location" :options="cityOptions" :configs="{...multiSelectConfigs, limit: 2, label: 'name', trackBy: 'name'}" @onInput="handleInputLocation"></VWMultiSelect>
        </b-form-group>
      </div>
      <div class="vw-form__row vw-form__row--1-1">
        <b-form-group class="vw-form__group" :label="influencerFilterOccupation.title" label-class="vw-form__label" label-for="campaign-influencer-occupation">
          <VWMultiSelect :value="influencerFilterOccupation.value" inputId="campaign-influencer-occupation" placeholder="Multi-select Occupation" :options="occupationOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputOccupation"></VWMultiSelect>
        </b-form-group>
        <b-form-group class="vw-form__group" :label="influencerFilterAge.title" label-class="vw-form__label" label-for="campaign-influencer-age">
          <VWMultiSelect :value="influencerFilterAge.value" inputId="campaign-influencer-age" placeholder="Multi-select range of age" :options="ageOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputAge"></VWMultiSelect>
        </b-form-group>
      </div>
      <div class="vw-form__row vw-form__row--1-1">
        <b-form-group class="vw-form__group" :label="influencerFilterGender.title" label-class="vw-form__label" label-for="campaign-influencer-gender">
          <VWMultiSelect :value="influencerFilterGender.value" inputId="campaign-influencer-gender" placeholder="Multi-select Gender" :options="genderOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputGender"></VWMultiSelect>
        </b-form-group>
        <b-form-group class="vw-form__group" :label="influencerFilterStyle.title" label-class="vw-form__label" label-for="campaign-influencer-style">
          <VWMultiSelect :value="influencerFilterStyle.value" inputId="campaign-influencer-style" placeholder="Select" :options="styleOptions" :configs="{...multiSelectConfigs, multiple: false}" @onInput="handleInputStyle"></VWMultiSelect>
        </b-form-group>
      </div>
      <div class="vw-form__row vw-form__row--1-1">
        <b-form-group class="vw-form__group" :label="influencerFilterMaritialStatus.title" label-class="vw-form__label" label-for="campaign-influencer-marital">
          <VWMultiSelect :value="influencerFilterMaritialStatus.value" inputId="campaign-influencer-marital" placeholder="Select" :options="maritalOptions" :configs="{...multiSelectConfigs, multiple: false}" @onInput="handleInputMarital"></VWMultiSelect>
        </b-form-group>
        <b-form-group class="vw-form__group" :label="influencerFilterKid.title" label-class="vw-form__label" label-for="campaign-influencer-kid">
          <VWMultiSelect :value="influencerFilterKid.value" inputId="campaign-influencer-kid" placeholder="Select" :options="kidOptions" :configs="{...multiSelectConfigs, multiple: false}" @onInput="handleInputKid"></VWMultiSelect>
        </b-form-group>
      </div>
      <div class="vw-form__row vw-form__row--1-1">
        <b-form-group class="vw-form__group" :label="influencerFilterBrandAmbassador.title" label-class="vw-form__label" label-for="campaign-influencer-brand-ambassador">
          <VWMultiSelect :value="influencerFilterBrandAmbassador.value" inputId="campaign-influencer-brand-ambassador" placeholder="Multi-select Brand" :options="brandOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputBrandAmbassador"></VWMultiSelect>
        </b-form-group>
        <b-form-group class="vw-form__group" :label="influencerFilterBrandHistory.title" label-class="vw-form__label" label-for="campaign-influencer-brand-history">
          <VWMultiSelect :value="influencerFilterBrandHistory.value" inputId="campaign-influencer-brand-history" placeholder="Multi-select Brand" :options="brandOptions" :configs="{...multiSelectConfigs, limit: 2}" @onInput="handleInputBrandHistory"></VWMultiSelect>
        </b-form-group>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { genderEnum, maritalStatusEnum, multiSelectConfigs } from '@/variables'
import {
  UPDATE_CAMPAIGN_FILTER_TOPIC,
  UPDATE_CAMPAIGN_FILTER_LOCATION,
  UPDATE_CAMPAIGN_FILTER_OCCUPATION,
  UPDATE_CAMPAIGN_FILTER_AGE,
  UPDATE_CAMPAIGN_FILTER_GENDER,
  UPDATE_CAMPAIGN_FILTER_STYLE,
  UPDATE_CAMPAIGN_FILTER_MARITAL,
  UPDATE_CAMPAIGN_FILTER_KID,
  UPDATE_CAMPAIGN_FILTER_BRAND_AMSSADOR,
  UPDATE_CAMPAIGN_FILTER_BRAND_HISTORY
} from '@/eventBus-types'

export default {
  name: 'campaign-modal-influencer-filter-form-advance',
  props: {
    influencerFilterTopic: Object,
    influencerFilterLocation: Object,
    influencerFilterOccupation: Object,
    influencerFilterAge: Object,
    influencerFilterGender: Object,
    influencerFilterStyle: Object,
    influencerFilterMaritialStatus: Object,
    influencerFilterKid: Object,
    influencerFilterBrandAmbassador: Object,
    influencerFilterBrandHistory: Object
  },
  components: {
    VWMultiSelect: () => import('@/components/Elements/MultiSelect.vue')
  },
  data () {
    return {
      multiSelectConfigs: multiSelectConfigs,
      genderOptions: genderEnum,
      maritalOptions: maritalStatusEnum
    }
  },
  computed: {
    ...mapState({
      topicOfInterestOptions: state => state.dataHub.topicOfInterest,
      cityOptions: state => state.address.cityList,
      occupationOptions: state => state.dataHub.occupation,
      ageOptions: state => state.dataHub.age,
      styleOptions: state => state.dataHub.style,
      kidOptions: state => state.dataHub.kid,
      brandOptions: state => state.dataHub.brand
    })
  },
  methods: {
    handleInputTopic (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_TOPIC,
        value: value
      })
    },
    handleInputLocation (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_LOCATION,
        value: value
      })
    },
    handleInputOccupation (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_OCCUPATION,
        value: value
      })
    },
    handleInputAge (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_AGE,
        value: value
      })
    },
    handleInputGender (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_GENDER,
        value: value
      })
    },
    handleInputStyle (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_STYLE,
        value: value
      })
    },
    handleInputMarital (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_MARITAL,
        value: value
      })
    },
    handleInputKid (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_KID,
        value: value
      })
    },
    handleInputBrandAmbassador (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_BRAND_AMSSADOR,
        value: value
      })
    },
    handleInputBrandHistory (value) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_BRAND_HISTORY,
        value: value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vw-campaign {
  &__form-group {
    &-toggle {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
