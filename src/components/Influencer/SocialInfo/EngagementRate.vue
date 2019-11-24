<template>
  <div class="vw-social__rate">
    <div class="vw-social__rate-label">{{ label }}</div>
    <VWPercentChart class="vw-social__rate-chart" :percent="percent" :color="chartColor" />
  </div>
</template>

<script>
export default {
  name: 'social-engagement-rate',
  components: {
    VWPercentChart: () => import('@/components/VWPercentChart/VWPercentChart.vue')
  },
  props: {
    label: {
      type: String,
      default: 'Engagement Rate'
    },
    percent: String,
    chartColor: String
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__rate {
    flex: 1 0 11rem;
    max-width: 11rem;
    border-radius: 0.25rem;
    padding: 1rem 1.125rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-weight: 400;
    font-size: 0.8125rem;
    background-color: #ebf1fe;
    margin: 0 0.8125rem 1.625rem;
    &-label {
      margin-bottom: 0.625rem;
    }
    &-chart {
      width: 4.5rem;
      height: 4.5rem;
    }
  }
}
</style>
