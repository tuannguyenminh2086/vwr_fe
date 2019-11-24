<template>
  <div class="vw-avatar__wrapper">
    <img class="vw-avatar" :src="imgUrl" :alt="imgInfo" />
  </div>
</template>

<script>
export default {
  name: 'influencer-avatar',
  props: {
    imgUrl: String,
    imgInfo: String
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-avatar {
  &__wrapper {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    overflow: hidden;
    border: 0.125rem solid $color-yellow;
    background-color: $color-app-bg;
  }
}
</style>
