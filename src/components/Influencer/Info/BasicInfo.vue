<template>
  <div>
    <p class='vw-info__section-title'>0.1 Basic infomation</p>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group class='vw-form__group' label='Name/ Stage name' label-class='vw-form__label'>
        <b-form-input
          class='vw-form__control'
          placeholder='Enter name'
          :value='data.stageName'
          @input='handleStageNameChange'
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Gender' label-class='vw-form__label'>
        <VWMultiSelect
          v-if="genderOptions.length > 0"
          :value="{_id: data.gender, label: genderOptions.find(x => x._id === data.gender) ? genderOptions.find(x => x._id === data.gender).label : 'Select gender'}"
          inputId="influencer-gender"
          placeholder="Select gender"
          :options="genderOptions"
          :configs="{...multiSelectConfigs, multiple: false}"
          @onInput="handleGenderChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Date of birth' label-class='vw-form__label'>
        <VWDatepicker
          :value='data.birthday'
          @input='dobSelected'
        >
        </VWDatepicker>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Occupation' label-class='vw-form__label'>
        <VWMultiSelect
          :value="dataOccupation"
          inputId="influencer-occupation"
          placeholder="Multi-select Occupation"
          :options="occupationOptions"
          :configs="{...multiSelectConfigs, limit: 2}"
          @onInput="handleOccupationChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group class='vw-form__group' label='Topic of interest' label-class='vw-form__label'>
        <VWMultiSelect
          :value="data.topicOfInterest.map(x => ({_id: x, label: topicOptions.find(y => y._id === x).label}))"
          inputId="influencer-topic-of-interest"
          placeholder="Multi-select Topic"
          :options="topicOptions"
          :configs="{...multiSelectConfigs, limit: 2}"
          @onInput="handleTopicOfInterestChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Location' label-class='vw-form__label'>
        <VWMultiSelect
          v-if="cityOptions.length > 0"
          :value="dataLocation"
          inputId="influencer-location"
          placeholder="Multi-select Location"
          :options="cityOptions"
          :configs="{...multiSelectConfigs, multiple: false, label: 'name', trackBy: 'name'}"
          @onInput="handleLocationChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
        <b-form-group class='vw-form__group' label='Marital status' label-class='vw-form__label'>
        <VWMultiSelect
          :value="maritalStatusOptions.find(x => x._id === data.maritalStatus) ? {_id: data.maritalStatus, label: maritalStatusOptions.find(x => x._id === data.maritalStatus).label} : null"
          inputId="influencer-marial-status"
          placeholder="Select status"
          :options="maritalStatusOptions"
          :configs="{...multiSelectConfigs, multiple: false}"
          @onInput="handleMaritalStatusChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Kid' label-class='vw-form__label'>
        <VWMultiSelect
          :value="{_id: data.kid, label: kidOptions.find(x => x._id === data.kid) ? kidOptions.find(x => x._id === data.kid).label : 'Select'}"
          inputId="influencer-kid"
          placeholder="Select"
          :options="kidOptions"
          :configs="{...multiSelectConfigs, multiple: false}"
          @onInput="handleKidChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group class='vw-form__group' label='Style' label-class='vw-form__label'>
        <VWMultiSelect
          :value="data.style.map(x => ({_id: x, label: styleOptions.find(y => y._id === x).label}))"
          inputId="influencer-style"
          placeholder="Select"
          :options="styleOptions"
          :configs="{...multiSelectConfigs, limit: 2}"
          @onInput="handleStyleChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Award' label-class='vw-form__label'>
        <b-form-input
          class='vw-form__control'
          placeholder='Enter award'
          :value='data.award'
          trim
          @input='handleAwardChange'
        ></b-form-input>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Brand Ambassador' label-class='vw-form__label'>
        <VWMultiSelect
          :value="dataBrand"
          inputId="influencer-brand-ambassador"
          placeholder="Multi-select Brand"
          :options="brandOptions"
          :configs="{...multiSelectConfigs, limit: 2}"
          @onInput="handleBrandAmbassadorChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
      <b-form-group class='vw-form__group' label='Brand history' label-class='vw-form__label'>
        <VWMultiSelect
          :value="dataBrand"
          inputId="influencer-brand-history"
          placeholder="Multi-select Brand"
          :options="brandOptions"
          :configs="{...multiSelectConfigs, limit: 2}"
          @onInput="handleBrandHistoryChange"
          customValue="_id"
        >
        </VWMultiSelect>
      </b-form-group>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/helper'
import {
  UPDATE_STAGE_NAME,
  UPDATE_GENDER,
  UPDATE_DATE_OF_BIRTH,
  UPDATE_OCCUPATION,
  UPDATE_TOPIC_OF_INTEREST,
  UPDATE_LOCATION,
  UPDATE_MARITAL_STATUS,
  UPDATE_KID,
  UPDATE_STYLE,
  UPDATE_AWARD,
  UPDATE_BRAND_AMBASSADOR,
  UPDATE_BRAND_HISTORY
} from '@/eventBus-types'
import { multiSelectConfigs } from '@/variables'
import { head } from 'lodash'
export default {
  name: 'influencer-basic-info',
  components: {
    VWDatepicker: () => import('@/components/VWDatepicker/VWDatepicker'),
    VWMultiSelect: () => import('@/components/Elements/MultiSelect.vue')
  },
  data () {
    return {
      multiSelectConfigs: multiSelectConfigs
    }
  },
  props: {
    data: Object,
    genderOptions: Array,
    occupationOptions: Array,
    topicOptions: Array,
    cityOptions: Array,
    maritalStatusOptions: Array,
    styleOptions: Array,
    kidOptions: Array,
    brandOptions: Array
  },
  computed: {
    dataLocation () {
      if (!this.data && !this.cityOptions) { return }
      let { location } = this.data
      let { cityOptions } = this
      let city = cityOptions.find(y => y._id === head(location))
      return location.map(x => ({ _id: x, name: city.name }))
    },
    dataBrand () {
      if (!this.data && !this.brandOptions) { return }
      return this.data.brandAmbassador.map(x => ({ _id: x, label: this.brandOptions.find(y => y._id === x).label }))
    },
    dataOccupation () {
      if (!this.data && !this.occupationOptions) { return }
      return this.data.occupation.map(x => ({ _id: x, label: this.occupationOptions.find(y => y._id === x).label }))
    }
  },
  methods: {
    handleStageNameChange (value) {
      this.$geb.emit({ id: UPDATE_STAGE_NAME, data: value })
    },

    handleGenderChange (value) {
      this.$geb.emit({ id: UPDATE_GENDER, data: value })
    },
    dobSelected (value) {
      let convertedDate = formatDate(value)
      this.$geb.emit({ id: UPDATE_DATE_OF_BIRTH, data: convertedDate })
    },

    handleOccupationChange (value) {
      this.$geb.emit({ id: UPDATE_OCCUPATION, data: value })
    },

    handleTopicOfInterestChange (value) {
      this.$geb.emit({ id: UPDATE_TOPIC_OF_INTEREST, data: value })
    },

    handleLocationChange (value) {
      this.$geb.emit({ id: UPDATE_LOCATION, data: value })
    },

    handleMaritalStatusChange (value) {
      this.$geb.emit({ id: UPDATE_MARITAL_STATUS, data: value })
    },

    handleKidChange (value) {
      this.$geb.emit({ id: UPDATE_KID, data: value })
    },

    handleStyleChange (value) {
      this.$geb.emit({ id: UPDATE_STYLE, data: value })
    },

    handleAwardChange (value) {
      this.$geb.emit({ id: UPDATE_AWARD, data: value })
    },

    handleBrandAmbassadorChange (value) {
      this.$geb.emit({ id: UPDATE_BRAND_AMBASSADOR, data: value })
    },

    handleBrandHistoryChange (value) {
      this.$geb.emit({ id: UPDATE_BRAND_HISTORY, data: value })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';
.vw-info {
  &__section-title {
    margin-top: 4.5rem;
    color: $color-form-title;
  }
  &__form {
    &-bottom-row {
      justify-content: flex-end;
    }
    &-col {
      padding-bottom: 0;
      @media screen and (width: 768px) {
        flex: 0 0 50%;
        max-width: 50%;
      }
      &--align-right {
        display: flex;
        justify-content: flex-end;
      }
    }
    &-issue-image {
      border: 1px solid $color-app-bg;
      padding: 5px;
    }
  }
}
/deep/ input:placeholder-shown {
  color: #6c757d;
}
</style>
