<template>
  <div :class="titleClass">{{ title }}</div>
</template>

<script>
export default {
  name: 'social-post-title',
  props: {
    title: String,
    platform: String
  },
  computed: {
    titleClass () {
      return `vw-social__post-title vw-social__post-title--${this.platform}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__post {
    &-title {
      text-transform: uppercase;
      max-height: 1.125rem;
      overflow: hidden;
      &--youtube {
        font-weight: 500;
        font-size: 1.125rem;
        max-height: 1.5625rem;
        line-height: 1.33;
        color: $color-black;
        text-transform: none;
        margin-bottom: 0.25rem;
        &:empty {
          margin-bottom: 0;
        }
      }
      &--instagram {
        font-size: 0.875rem;
        font-weight: 400;
        color: $color-social-post;
        text-transform: none;
      }
    }
  }
}
</style>
