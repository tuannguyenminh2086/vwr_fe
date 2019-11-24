<template>
  <a :href="link" target="_blank" class="vw-social__post-see-more">{{ label }}</a>
</template>

<script>
export default {
  name: 'social-post-see-more',
  props: {
    link: String,
    label: {
      type: String,
      default: 'See more'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__post {
    &-see-more {
      display: inline-block;
      vertical-align: top;
      font-size: 0.6875rem;
      margin-bottom: 1.125rem
    }
  }
}
</style>
