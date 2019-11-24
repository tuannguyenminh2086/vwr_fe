<template>
  <div class="vw-campaign__form-group">
    <b-button v-b-toggle.campaign-filter-form-search-by class="vw-button vw-button--link-primary vw-button--toggle vw-campaign__form-group-toggle">Search by Fan insights</b-button>
    <b-collapse id="campaign-filter-form-search-by">
      <div class="vw-form__row vw-form__row--1-1">
        <b-form-group class="vw-form__group vw-form__group--pr-4" :label="influencerFilterFanAge.title" label-class="vw-form__label vw-form__label--mb-1">
          <div class="vw-form__checkbox-list">
            <div class="vw-form__checkbox-item" v-for="item in influencerFilterFanAge.value.list" :key="item.id">
              <b-form-checkbox class="vw-form__checkbox-label" :checked="item.checked" @input="handleCheckAge($event, item.id)">{{ item.label }}</b-form-checkbox>
              <div class="vw-form__checkbox-input-wrapper">
                <span class="vw-form__checkbox-input-label">>=</span>
                <b-form-input class="vw-form__control vw-form__checkbox-input" :value="item.value" :placeholder="`${item.defaultValue}%`" type="number" min="0" max="100" @input="handleInputAge($event, item.id)" @keyup.enter="handleFilter"></b-form-input>
              </div>
            </div>
          </div>
        </b-form-group>
        <div class="vw-form__row">
          <b-form-group class="vw-form__group vw-form__group--pr-4" :label="influencerFilterFanGender.title" label-class="vw-form__label vw-form__label--mb-1">
            <div class="vw-form__checkbox-list">
              <div class="vw-form__checkbox-item" v-for="item in influencerFilterFanGender.value.list" :key="item.id">
                <b-form-checkbox class="vw-form__checkbox-label" :checked="item.checked" @change="handleCheckGender($event, item.id)">{{ item.label }}</b-form-checkbox>
                <div class="vw-form__checkbox-input-wrapper">
                  <span class="vw-form__checkbox-input-label">>=</span>
                  <b-form-input class="vw-form__control vw-form__checkbox-input" :value="item.value" :placeholder="`${item.defaultValue}%`" type="number" min="0" max="100" @input="handleInputGender($event, item.id)" @keyup.enter="handleFilter"></b-form-input>
                </div>
              </div>
            </div>
          </b-form-group>
          <b-form-group class="vw-form__group vw-form__group--pr-4" :label="influencerFilterFanLocation.title" label-class="vw-form__label vw-form__label--mb-1">
            <div class="vw-form__checkbox-list">
              <div class="vw-form__checkbox-item" v-for="item in influencerFilterFanLocation.value.list" :key="item.id">
                <b-form-checkbox class="vw-form__checkbox-label" :checked="item.checked" @change="handleCheckLocation($event, item.id)">{{ item.label }}</b-form-checkbox>
                <div class="vw-form__checkbox-input-wrapper">
                  <span class="vw-form__checkbox-input-label">>=</span>
                  <b-form-input class="vw-form__control vw-form__checkbox-input" :value="item.value" :placeholder="`${item.defaultValue}%`" type="number" min="0" max="100" @input="handleInputLocation($event, item.id)" @keyup.enter="handleFilter"></b-form-input>
                </div>
              </div>
            </div>
          </b-form-group>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import {
  FILTER_CAMPAIGN_INFLUENCER,
  UPDATE_CAMPAIGN_FILTER_FAN_AGE,
  UPDATE_CAMPAIGN_FILTER_FAN_GENDER,
  UPDATE_CAMPAIGN_FILTER_FAN_LOCATION
} from '@/eventBus-types'

export default {
  name: 'campaign-modal-influencer-filter-form-search-by',
  props: {
    influencerFilterFanAge: Object,
    influencerFilterFanGender: Object,
    influencerFilterFanLocation: Object
  },
  data () {
    return {
    }
  },
  methods: {
    handleCheckAge (value, id) {
      let changeData = cloneDeep(this.influencerFilterFanAge)
      changeData.value.list.find(x => x.id === id).checked = value
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_FAN_AGE,
        value: changeData
      })
    },
    handleInputAge (value, id) {
      let changeData = cloneDeep(this.influencerFilterFanAge)
      changeData.value.list.find(x => x.id === id).value = value
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_FAN_AGE,
        value: changeData
      })
    },
    handleCheckGender (value, id) {
      let changeData = cloneDeep(this.influencerFilterFanGender)
      changeData.value.list.find(x => x.id === id).checked = value
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_FAN_GENDER,
        value: changeData
      })
    },
    handleInputGender (value, id) {
      let changeData = cloneDeep(this.influencerFilterFanGender)
      changeData.value.list.find(x => x.id === id).value = value
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_FAN_GENDER,
        value: changeData
      })
    },
    handleCheckLocation (value, id) {
      let changeData = cloneDeep(this.influencerFilterFanLocation)
      changeData.value.list.find(x => x.id === id).checked = value
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_FAN_LOCATION,
        value: changeData
      })
    },
    handleInputLocation (value, id) {
      let changeData = cloneDeep(this.influencerFilterFanLocation)
      changeData.value.list.find(x => x.id === id).value = value
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_FILTER_FAN_LOCATION,
        value: changeData
      })
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
@import './../../../assets/scss/base/variables';

.vw-campaign {
  &__form-group {
    &-toggle {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  }
}

.vw-form {
  &__checkbox {
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
    &-label {
      font-size: 0.8125rem;
      line-height: 1.5rem;
    }
    &-input {
      flex: 1 0 auto;
      padding: 0.375rem 0.25rem 0.375rem 2rem;
      max-width: 5rem;
      &-wrapper {
        position: relative;
      }
      &-label {
        position: absolute;
        top: 50%;
        left: 0.625rem;
        font-size: 0.75rem;
        color: $color-controltext;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
