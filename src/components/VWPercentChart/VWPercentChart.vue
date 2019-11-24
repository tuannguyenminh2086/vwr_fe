<template>
  <div class="vw-chart">
    <svg class="vw-chart__circle" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke-width="10" fill="transparent" stroke="#c8c9d0"></circle>
      <circle cx="50" cy="50" r="40" stroke-width="12" fill="transparent" :stroke="color" :stroke-dasharray="strokeDashArray" :stroke-dashoffset="strokePercent"></circle>
    </svg>
    <div class="vw-chart__value" :style="valueStyle">{{percent}}%</div>
  </div>
</template>

<script>
export default {
  name: 'vw-percent-chart',
  props: {
    percent: String,
    color: String
  },
  computed: {
    strokeDashArray () {
      return 40 * 2 * Math.PI
    },
    strokePercent () {
      if (this.percent > 100) {
        return 0
      }
      return this.strokeDashArray * (100 - this.percent) / 100
    },
    valueStyle () {
      let fontSize = Number(this.percent) > 1000 ? '0.625rem' : Number(this.percent) > 100 ? '0.75rem' : '1rem'
      return {
        color: this.color,
        fontSize: fontSize
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-chart {
  position: relative;
  &__circle {
    circle {
      transform-origin: 50%;
      transform: rotate(-90deg);
      transition: stroke-dashoffset 0.5s linear;
    }
  }
  &__value {
    font-size: 1.125rem;
    font-size: 1rem;
    font-weight: 500;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

</style>
