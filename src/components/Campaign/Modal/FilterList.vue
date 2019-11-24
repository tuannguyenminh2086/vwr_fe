<template>
  <div class="vw-tags" v-show="filterTagList.length > 0">
    <div class="vw-tags__title">{{ counter }}</div>
    <FilterBadge v-for="item in filterTagList" :key="item.id" :item="item"/>
  </div>
</template>

<script>
export default {
  name: 'campaign-modal-influencer-filter-list',
  props: {
    filterTagList: Array
  },
  components: {
    FilterBadge: () => import('./FilterBadge.vue')
  },
  data () {
    return {
    }
  },
  computed: {
    counter () {
      let length = this.filterTagList.length
      return `Filter${length > 1 ? 's' : ''} (${length}):`
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.6875rem;
  margin-bottom: 2rem;
  &__title {
    color: $color-black;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
