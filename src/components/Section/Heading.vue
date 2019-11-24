<template>
  <div class="vw-section__heading">
    <span class="vw-section__heading-label">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'vw-section-heading',
  props: {
    title: String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-section {
  &__heading {
    font-weight: 500;
    font-size: 1.125rem;
    color: $color-subtext;
    margin-bottom: 0.5rem;
  }
}
</style>
