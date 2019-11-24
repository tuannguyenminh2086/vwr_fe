<template>
  <div class="vw-statistic">
    <div class="vw-statistic__inner">
      <div class="vw-statistic__label">{{ label }}</div>
      <div class="vw-statistic__number" :style="colorStyle">{{ prefix }}{{ currentNumber | formatNumber }}</div>
      <div class="vw-statistic__metas" v-if="targetNumber > 0">
        <Icon class="vw-statistic__icon vw-statistic__icon--up" name="arrow-up" v-if="up"></Icon>
        <Icon class="vw-statistic__icon vw-statistic__icon--down" name="arrow-down" v-else></Icon>
        <span class="vw-statistic__text">{{ percent }}% of KPI</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statistic',
  props: {
    label: String,
    currentNumber: Number,
    targetNumber: Number,
    prefix: String,
    color: String
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  computed: {
    percent () {
      if (this.targetNumber > 0) {
        let distance = Math.abs(this.currentNumber - this.targetNumber)
        return (distance / this.targetNumber).toFixed(2)
      }
      return 0
    },
    up () {
      return this.currentNumber - this.targetNumber > 0
    },
    colorStyle () {
      return {
        color: this.color
      }
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/base/variables';

.vw-statistic {
  &__label {
    font-size: 0.8125rem;
    margin-bottom: 0.5rem;
    color: $color-controltext;
  }
  &__number {
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.5;
    color: $color-main;
  }
  &__metas {
    display: flex;
  }
  &__icon {
    &--up {
      color: $color-success;
    }
    &--down {
      color: $color-warning;
    }
  }
  &__text {
    font-size: 0.8125rem;
    margin-left: 0.25rem;
  }
}
</style>
