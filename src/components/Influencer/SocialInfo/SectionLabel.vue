<template>
  <div class="vw-social__label">{{ label }}</div>
</template>

<script>
export default {
  name: 'social-section-label',
  props: {
    label: String
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__label {
    font-size: 1.125rem;
    font-weight: 500;
    color: $color-controltext;
    margin-bottom: 1rem;
  }
}
</style>
