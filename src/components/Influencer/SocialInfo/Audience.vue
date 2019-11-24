<template>
  <div class="vw-social__audience">
    <div class="vw-social__audience-label">{{ label }}</div>
    <div class="vw-social__audience-value">{{ value }}</div>
    <div class="vw-social__audience-level" :style="levelColor">{{ level.label }}</div>
  </div>
</template>

<script>
export default {
  name: 'social-audience',
  props: {
    label: String,
    value: String,
    level: Object
  },
  computed: {
    levelColor () {
      return {
        backgroundColor: this.level.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__audience {
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
    &-value {
      color: $color-main;
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    &-level {
      color: $color-white;
      padding: 0.375rem 1.25rem;
      font-size: 0.875rem;
      border-radius: 2.5rem;
      background-color: $color-black;
      text-transform: uppercase;
    }
  }
}
</style>
