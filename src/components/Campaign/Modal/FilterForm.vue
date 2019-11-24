<template>
  <VWSection title="Add from previous Campaign" noPadding headingMargin="1.5rem">
    <div class="vw-campaign__form-group-wrapper" id="campaign-filter-form-group">
      <div class="vw-campaign__form-group-inner">
        <FilterFormBasic
          :influencerFilterName="filterData.name"
          :influencerFilterLink="filterData.link"
          :influencerFilterPlatform="filterData.platform"
          :influencerFilterAudience="filterData.audience"
          :influencerFilterLevel="filterData.level"
          :influencerFilterEngagement="filterData.averageEngagement"></FilterFormBasic>
        <FilterFormAdvance
          :influencerFilterTopic="filterData.topicOfInterest"
          :influencerFilterLocation="filterData.location"
          :influencerFilterOccupation="filterData.occupation"
          :influencerFilterAge="filterData.age"
          :influencerFilterGender="filterData.gender"
          :influencerFilterStyle="filterData.style"
          :influencerFilterMaritialStatus="filterData.maritalStatus"
          :influencerFilterKid="filterData.kid"
          :influencerFilterBrandAmbassador="filterData.brandAmbassador"
          :influencerFilterBrandHistory="filterData.brandHistory"></FilterFormAdvance>
        <FilterFormSearchBy
          :influencerFilterFanAge="filterData.fanInsightAge"
          :influencerFilterFanGender="filterData.fanInsightGender"
          :influencerFilterFanLocation="filterData.fanInsightLocation"></FilterFormSearchBy>
      </div>
    </div>
    <FilterFooter></FilterFooter>
  </VWSection>
</template>

<script>
import { isMacOS } from '@/helper'
import { debounce } from 'lodash'

export default {
  name: 'campaign-modal-influencer-filter-form',
  components: {
    VWSection: () => import('@/components/Section/Section.vue'),
    FilterFormBasic: () => import('./FilterFormBasic'),
    FilterFormAdvance: () => import('./FilterFormAdvance'),
    FilterFormSearchBy: () => import('./FilterFormSearchBy'),
    FilterFooter: () => import('./FilterFooter')
  },
  props: {
    filterData: Object
  },
  data () {
    return {
    }
  },
  methods: {
    initVuebar: debounce(function () {
      if (!isMacOS()) {
        let $el = document.getElementById('campaign-filter-form-group')
        this.$vuebar.initScrollbar($el, { preventParentScroll: true, scrollThrottle: 30 })
      }
    }, 300)
  },
  mounted () {
    this.initVuebar()
  }
}
</script>

<style lang="scss" scoped>

.vw-campaign {
  &__form-group {
    &-wrapper {
      height: 33.5rem;
      @at-root .isMacOS {
        .vw-campaign {
          &__form-group {
            &-wrapper {
              overflow: auto;
            }
            &-inner {
              padding-left: 1rem;
            }
          }
        }
      }
    }
    &-inner {
      padding-left: 0.25rem;
      padding-right: 1.5rem;
    }
  }
}
</style>
