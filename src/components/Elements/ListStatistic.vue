<template>
  <div class="vw-statistics">
    <VWSectionHeading class="vw-statistics__heading" :title="title"></VWSectionHeading>
    <div class="vw-statistics__list" :style="listStyle">
      <VWStatistic v-for="item in statisticList"
          :key="item.id"
          :label="item.label"
          :currentNumber="item.currentNumber"
          :prefix="item.prefix"
          :targetNumber="item.targetNumber"
          :color="item.color">
      </VWStatistic>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-statistic',
  props: {
    title: String,
    statisticList: Array
  },
  components: {
    VWSectionHeading: () => import('@/components/Section/Heading.vue'),
    VWStatistic: () => import('./Statistic.vue')
  },
  data () {
    return {
    }
  },
  computed: {
    listStyle () {
      return {
        gridTemplateColumns: `repeat(${this.statisticList.length}, 1fr)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-statistics {
  margin-bottom: 3.75rem;
  &__heading {
    margin-bottom: 1.5rem;
  }
  &__list {
    display: grid;
    grid-gap: 0 2rem;
  }
}
</style>
