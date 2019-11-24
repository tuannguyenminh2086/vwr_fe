<template>
  <div class="vw-info__address-info">
    <b-button v-b-toggle.personal-info-collapse class="vw-button vw-button--link-primary vw-button--toggle mt-2">
      Personal Infomation
    </b-button>
    <b-collapse id="personal-info-collapse" v-model="isPersonalInfoExpand" class="mt-3">
      <div class="vw-form__row">
        <p class="vw-info__section-title vw-info__toggle-personal-title mt-3">
          Address
        </p>
      </div>
      <!-- Four row -->
      <div class="vw-form__row vw-form__row--1-1-1-1">
        <b-form-group
          class="vw-form__group"
          label="Country"
          label-class="vw-form__label"
        >
          <VWMultiSelect :value="countryEnum.find(x => x._id === data.address.country) ? {_id: data.address.country, name: countryEnum.find(x => x._id === data.address.country).name} : null" inputId="influencer-country" placeholder="Select" :options="countryEnum" :configs="{...multiSelectConfigs, multiple: false, label: 'name', trackBy: 'name'}" customValue="_id" @onInput="countrySelected"></VWMultiSelect>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="City/ Province"
          label-class="vw-form__label"
        >
          <VWMultiSelect :value="cityOptions.find(x => x._id === data.address.city) ? {_id: data.address.city, name: cityOptions.find(x => x._id === data.address.city).name} : null" inputId="influencer-city" placeholder="Select" :options="cityOptions" :configs="{...multiSelectConfigs, multiple: false, label: 'name', trackBy: 'name'}" @onInput="citySelected" customValue="_id" v-if="cityOptions && cityOptions.length > 0"></VWMultiSelect>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="District"
          label-class="vw-form__label"
        >
          <VWMultiSelect :value="districtOptions.find(x => x._id === data.address.district) ? {_id: data.address.district, name: districtOptions.find(x => x._id === data.address.district).name} : null" inputId="influencer-district" placeholder="Select" :options="districtOptions" :configs="{...multiSelectConfigs, multiple: false, label: 'name', trackBy: 'name'}" @onInput="districtSelected" customValue="_id"></VWMultiSelect>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="Ward"
          label-class="vw-form__label"
        >
          <VWMultiSelect :value="wardOptions.find(x => x._id === data.address.ward) ? {_id: data.address.ward, name: wardOptions.find(x => x._id === data.address.ward).name} : null" inputId="influencer-ward" placeholder="Select" :options="wardOptions" :configs="{...multiSelectConfigs, multiple: false, label: 'name', trackBy: 'name'}" @onInput="handleWardSelected" customValue="_id"></VWMultiSelect>
        </b-form-group>
      </div>
      <!-- End Four row -->
      <div class="vw-form__row vw-form__row--1-1">
        <b-form-group
          class="vw-form__group"
          label="Exact address"
          label-class="vw-form__label"
        >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter correct address"
            :value="data.address.exactAddress"
            trim
            @input="handleExactAddressChange"
            ></b-form-input>
        </b-form-group>
        <div class="vw-info__form-col vw-info__form-col--inline">
          <label class="vw-info__form-label">Address type</label>
          <b-form-radio-group
            id="address-type-group"
            :checked="data.address.addressType"
            @input="handleAddressTypeChange"
            :options="addressTypeOptions"
          >
          </b-form-radio-group>
        </div>
      </div>
    </b-collapse>
  </div>
</template>
<script>
import {
  UPDATE_COUNTRY,
  UPDATE_CITY,
  UPDATE_DISTRICT,
  UPDATE_WARD,
  UPDATE_EXACT_ADDRESS,
  UPDATE_ADDRESS_TYPE
} from '@/eventBus-types'
import { multiSelectConfigs, countryEnum } from '@/variables'
export default {
  name: 'influencer-address-info',
  data () {
    return {
      isPersonalInfoExpand: true,
      multiSelectConfigs: multiSelectConfigs,
      countryEnum: countryEnum
    }
  },
  components: {
    VWMultiSelect: () => import('@/components/Elements/MultiSelect.vue')
  },
  props: {
    data: Object,
    cityOptions: Array,
    districtOptions: Array,
    wardOptions: Array,
    addressTypeOptions: Array
  },
  methods: {
    countrySelected (value) {
      this.$geb.emit({ id: UPDATE_COUNTRY, data: value })
    },
    citySelected (value) {
      this.$geb.emit({ id: UPDATE_CITY, data: value })
    },

    districtSelected (value) {
      this.$geb.emit({ id: UPDATE_DISTRICT, data: value })
    },

    handleWardSelected (value) {
      this.$geb.emit({ id: UPDATE_WARD, data: value })
    },

    handleExactAddressChange (value) {
      this.$geb.emit({ id: UPDATE_EXACT_ADDRESS, data: value })
    },

    handleAddressTypeChange (value) {
      this.$geb.emit({ id: UPDATE_ADDRESS_TYPE, data: value })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './../../../assets/scss/base/variables';
  .vw-info {
    &__section-title {
      margin-top: 1rem;
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
        &--inline {
          display: flex;
          align-items: center;
          .vw-info__form-label {
            margin-bottom: 0;
            margin-right: 2.125rem;
          }
        }
      }
      &-issue-image {
        border: 1px solid $color-app-bg;
        padding: 5px;
      }
    }
  }
  .vw-button {
    &--toggle {
      line-height: 1.5rem;
    }
  }
</style>
