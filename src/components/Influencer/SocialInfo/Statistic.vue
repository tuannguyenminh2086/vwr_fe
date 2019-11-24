<template>
  <div class="vw-social__statistic">
    <span class="vw-social__statistic-label">{{ label }}</span>
    <span class="vw-social__statistic-value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'social-statistic',
  props: {
    label: String,
    value: String
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__statistic {
    font-weight: 500;
    font-size: 0.875rem;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    &-value {
      padding-left: 0.25rem;
    }
  }
}
</style>
