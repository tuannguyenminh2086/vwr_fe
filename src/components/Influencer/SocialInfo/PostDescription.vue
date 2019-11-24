<template>
  <div class="vw-social__post-description">{{ description }}</div>
</template>

<script>
export default {
  name: 'social-post-description',
  props: {
    description: String
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__post {
    &-description {
      margin-bottom: 0.5rem;
      max-height: 4.5rem;
      overflow: hidden;
      &:empty {
        margin-bottom: 0;
      }
    }
  }
}
</style>
