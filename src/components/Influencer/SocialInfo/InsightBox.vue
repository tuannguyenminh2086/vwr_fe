<template>
  <div class="vw-social__insight-box">
    <div class="vw-social__insight-box-title">{{ label }}</div>
    <VWPieChart
      v-if="!isEmpty"
      :name="chartName"
      width="112"
      height="112"
      :chartData="chartData"
      :colorData="colorData" />
    <div class="vw-social__insight-box-message" v-else>No Data Available</div>
  </div>
</template>

<script>
export default {
  name: 'social-insight-box',
  components: {
    VWPieChart: () => import('@/components/VWPieChart/VWPieChart.vue')
  },
  props: {
    label: String,
    chartName: String,
    chartData: Array,
    colorData: Array
  },
  computed: {
    isEmpty () {
      return this.chartData.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__insight {
    &-box {
      padding: 1.5rem;
      border-radius: 0.25rem;
      background-color: #eaebef;
      display: flex;
      flex-direction: column;
      &-title {
        font-size: 0.8125rem;
        margin-bottom: 1.5rem;
      }
      &-message {
        font-size: 1.25rem;
        color: $color-subtext;
        padding: 2rem 1rem;
        text-align: center;
      }
    }
  }
}
</style>
