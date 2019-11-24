<template>
  <b-modal modal-class="vw-modal vw-modal--influencer-filter" id="modal-campaign-influencer-filter" centered ref="modal-campaign-influencer-filter" hide-header hide-footer @hidden="handleFormHide" @shown="handleFormShown">
    <FilterForm
      :filterData="filterData"
      :isLoading="isLoading"></FilterForm>
    <Result
      :filterData="filterData"
      :filterResult="filterResult"
      :filterTagList="filterTagList"
      :isLoading="isLoading"></Result>
  </b-modal>
</template>

<script>
import FilterData from './formData/filterData'
import FilterResult from './formData/filterResult'
import { mapActions } from 'vuex'
import {
  MAKE_TOAST,
  SEARCH_CAMPAIGN
} from '@/store/action-types'
import {
  // Campaign filter influencer
  FILTER_CAMPAIGN_INFLUENCER,
  RESET_FILTER_CAMPAIGN_INFLUENCER,
  // Basic
  UPDATE_CAMPAIGN_FILTER_NAME,
  UPDATE_CAMPAIGN_FILTER_LINK,
  UPDATE_CAMPAIGN_FILTER_PLATFORM,
  UPDATE_CAMPAIGN_FILTER_AUDIENCE_FROM,
  UPDATE_CAMPAIGN_FILTER_AUDIENCE_TO,
  UPDATE_CAMPAIGN_FILTER_LEVEL,
  UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_FROM,
  UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_TO,
  // Advance
  UPDATE_CAMPAIGN_FILTER_TOPIC,
  UPDATE_CAMPAIGN_FILTER_LOCATION,
  UPDATE_CAMPAIGN_FILTER_OCCUPATION,
  UPDATE_CAMPAIGN_FILTER_AGE,
  UPDATE_CAMPAIGN_FILTER_GENDER,
  UPDATE_CAMPAIGN_FILTER_STYLE,
  UPDATE_CAMPAIGN_FILTER_MARITAL,
  UPDATE_CAMPAIGN_FILTER_KID,
  UPDATE_CAMPAIGN_FILTER_BRAND_AMSSADOR,
  UPDATE_CAMPAIGN_FILTER_BRAND_HISTORY,
  // Search by
  UPDATE_CAMPAIGN_FILTER_FAN_AGE,
  UPDATE_CAMPAIGN_FILTER_FAN_GENDER,
  UPDATE_CAMPAIGN_FILTER_FAN_LOCATION,
  // Filter result
  REMOVE_FILTER_TAG,
  UPDATE_CAMPAIGN_RESULT_PAGINATION,
  UPDATE_CAMPAIGN_RESULT_SORT,
  UPDATE_CAMPAIGN_RESULT_CHECKED,
  // Filter modal action
  ADD_FILTERED_INFLUENCER_TO_CAMPAIGN,
  CANCEL_FILTER_INFLUENCER_CAMPAIGN
} from '@/eventBus-types'

export default {
  name: 'campaign-modal-influencer-filter',
  components: {
    FilterForm: () => import('./FilterForm.vue'),
    Result: () => import('./Result.vue')
  },
  data () {
    return {
      filterData: new FilterData(),
      filterResult: new FilterResult(),
      subscribeFilterForm: null,
      isLoading: false,
      filterTagList: []
    }
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      _searchCampaign: `campaign/${SEARCH_CAMPAIGN}`
    }),
    initListenEventBus () {
      this.subscribeFilterForm = this.$geb.getBus().subscribe(data => {
        if (data.id) {
          switch (data.id) {
            // Filter influencer
            case FILTER_CAMPAIGN_INFLUENCER:
              // Update filterTagList
              this.filterTagList = this.filterData.convertToTag()
              // Filter
              this.handleFilter()
              break
            case RESET_FILTER_CAMPAIGN_INFLUENCER:
              // Reset filterData
              this.filterData.resetData()
              // Update filterTagList
              this.filterTagList = this.filterData.convertToTag()
              // Filter
              this.handleFilter()
              break

            // Basic
            case UPDATE_CAMPAIGN_FILTER_NAME:
              this.filterData.name.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_LINK:
              this.filterData.link.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_PLATFORM:
              this.filterData.platform.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_AUDIENCE_FROM:
              this.filterData.audience.from = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_AUDIENCE_TO:
              this.filterData.audience.to = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_LEVEL:
              this.filterData.level.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_FROM:
              this.filterData.averageEngagement.from = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_ENGAGEMENT_TO:
              this.filterData.averageEngagement.to = data.value
              break

            // Advance
            case UPDATE_CAMPAIGN_FILTER_TOPIC:
              this.filterData.topicOfInterest.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_LOCATION:
              this.filterData.location.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_OCCUPATION:
              this.filterData.occupation.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_AGE:
              this.filterData.age.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_GENDER:
              this.filterData.gender.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_STYLE:
              this.filterData.style.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_MARITAL:
              this.filterData.maritalStatus.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_KID:
              this.filterData.kid.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_BRAND_AMSSADOR:
              this.filterData.brandAmbassador.value = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_BRAND_HISTORY:
              this.filterData.brandHistory.value = data.value
              break

            // Search By
            case UPDATE_CAMPAIGN_FILTER_FAN_AGE:
              this.filterData.fanInsightAge = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_FAN_GENDER:
              this.filterData.fanInsightGender = data.value
              break
            case UPDATE_CAMPAIGN_FILTER_FAN_LOCATION:
              this.filterData.fanInsightLocation = data.value
              break

            // Filter Result
            case REMOVE_FILTER_TAG:
              // Remove Tag
              this.filterData.removeTag(data.value)
              // Update filterTagList
              this.filterTagList = this.filterData.convertToTag()
              // Filter
              this.handleFilter()
              break
            case UPDATE_CAMPAIGN_RESULT_PAGINATION:
              // Update current page
              this.filterData.currentPage = data.value
              // Filter Paginated Data
              this.searchCampaign()
              break
            case UPDATE_CAMPAIGN_RESULT_SORT:
              // Update sort
              this.filterData.sort = data.value
              // Filter Sorted Data
              this.searchCampaign()
              break
            case UPDATE_CAMPAIGN_RESULT_CHECKED:
              this.filterResult.toggleChecked(data.value)
              break

            // Filter modal action
            case ADD_FILTERED_INFLUENCER_TO_CAMPAIGN:
              // Add selectedList
              this.$emit('onAdd', this.filterResult.selectedList)
              // Hide modal
              this.$refs['modal-campaign-influencer-filter'].hide()
              break
            case CANCEL_FILTER_INFLUENCER_CAMPAIGN:
              // Hide modal
              this.$refs['modal-campaign-influencer-filter'].hide()
              break

            // Default
            default:
              break
          }
        }
      })
    },
    unsubscribeEvenBus () {
      this.subscribeFilterForm && this.subscribeFilterForm.unsubscribe()
    },
    async searchCampaign () {
      try {
        // Active Indicator
        this.isLoading = true
        // Get API
        let response = await this._searchCampaign(this.filterData.getDataToSubmit())

        if (response.data && response.data.success) {
          // Update influencer list
          this.filterResult.list = response.data.data.docs
          // Add checked property
          this.filterResult.addChecked()
          // Update total
          this.filterResult.total = response.data.data.totalDocs
        }
      } catch (error) {
        // eslint-disable-console
        console.log(error)
        // Show error
        this.makeToast({
          title: 'Something went wrong, please try again',
          variant: 'danger'
        })
      } finally {
        // Deactive Indicator
        this.isLoading = false
      }
    },
    handleFilter () {
      // Reset current page
      this.filterData.currentPage = 1
      // Clean selectedList
      this.filterResult.selectedList.length > 0 && this.filterResult.cleanSelectedList()
      // Filter
      this.searchCampaign()
    },
    handleFormHide () {
      // Reset filters
      this.filterData.resetData()
      // Update filterTagList
      this.filterTagList = this.filterData.convertToTag()
      // Clean result
      this.filterResult.cleanResult()
    },
    handleFormShown () {
      // Filter all
      this.handleFilter()
    }
  },
  mounted () {
    this.initListenEventBus()
  },
  beforeDestroy () {
    this.unsubscribeEvenBus()
  }
}
</script>

<style lang="scss">
@import './../../../assets/scss/base/variables';

.vw-modal {
  &--influencer-filter {
    .modal-dialog {
      width: 90%;
      max-width: 84rem;
    }
    .modal-body {
      padding: 2rem 1.5rem;
      display: grid;
      grid-gap: 0 1.5rem;
      grid-template-columns: 1fr 1.2fr;
    }
    .vw-section:not(:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
