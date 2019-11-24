<template>
  <div class="vw-social__name">{{ name }}</div>
</template>

<script>
export default {
  name: 'social-name',
  props: {
    name: String
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__name {
    font-size: 1.5rem;
    color: $color-title;
    margin-bottom: 0.625rem;
  }
}
</style>
