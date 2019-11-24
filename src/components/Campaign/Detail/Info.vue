<template>
  <div class="vw-campaign__form-group">
    <div class="vw-form__row vw-form__row--2-1">
      <b-form-group label="Campaign name:" label-class="vw-form__label" class="vw-form__group" label-for="campaign-name" :invalid-feedback="campaignNameFeedback">
        <b-form-input id="campaign-name" type="text" required :value="campaignName" class="vw-form__control" trim placeholder="Enter campaign name" @input="handleInputName" :state="campaignNameState" :disabled="!isCreate && !isEditable" @blur="handleNameBlur"></b-form-input>
      </b-form-group>
      <b-form-group label="Brand:" label-for="campaign-brand" label-class="vw-form__label" class="vw-form__group" :invalid-feedback="campaignBrandFeedback" :state="campaignBrandState">
        <VWMultiSelect :value="campaignBrand" inputId="campaign-brand" placeholder="Select brand" :options="brandOptions" :state="campaignBrandState" :configs="{...multiSelectConfigs, multiple: false, loading: dataHubLoading, disabled: !isCreate && !isEditable}" @onInput="handleInputBrand">
        </VWMultiSelect>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { multiSelectConfigs } from '@/variables'

export default {
  name: 'campaign-detail-form-info',
  props: {
    isCreate: Boolean,
    isEditable: Boolean,
    campaignName: String,
    campaignBrand: [String, Object],
    campaignNameState: Boolean,
    campaignNameFeedback: String,
    campaignBrandState: Boolean,
    campaignBrandFeedback: String
  },
  components: {
    VWMultiSelect: () => import('@/components/Elements/MultiSelect.vue')
  },
  data () {
    return {
      multiSelectConfigs: multiSelectConfigs
    }
  },
  computed: {
    ...mapState({
      brandOptions: state => state.dataHub.brand,
      dataHubLoading: state => state.dataHub.loading
    })
  },
  methods: {
    ...mapActions({
      getDataHub: `dataHub/getDataHubByClient`
    }),
    handleInputName (value) {
      this.$emit('update:campaignName', value)
    },
    handleInputBrand (value) {
      this.$emit('update:campaignBrand', value)
    },
    handleNameBlur () {
      this.$emit('onNameBlur')
    },
    async fetchData () {
      await this.getDataHub()
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-campaign {
  &__form-group {
    margin-bottom: 2rem;
  }
}
</style>
