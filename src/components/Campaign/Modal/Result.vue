<template>
  <VWSection class="vw-campaign__result" title="Result" noPadding headingMargin="1.5rem">
    <FilterList :filterTagList="filterTagList"></FilterList>
    <InfluencerList
      :itemsPerPage="filterData.itemsPerPage"
      :currentPage="filterData.currentPage"
      :filterResult="filterResult"
      :isBusy="isLoading"></InfluencerList>
    <ModalActions></ModalActions>
  </VWSection>
</template>

<script>
export default {
  name: 'campaign-modal-influencer-filter-result',
  components: {
    VWSection: () => import('@/components/Section/Section.vue'),
    FilterList: () => import('./FilterList.vue'),
    InfluencerList: () => import('./InfluencerList.vue'),
    ModalActions: () => import('./ModalActions.vue')
  },
  props: {
    filterData: Object,
    filterResult: Object,
    isLoading: Boolean,
    filterTagList: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.vw-campaign {
  &__result {
    display: flex;
    flex-direction: column;
    /deep/ .vw-section__content {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
