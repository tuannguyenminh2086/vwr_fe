<template>
  <div class="vw-not-found">
    <h1 class="vw-not-found__title">Are you lost?</h1>
    <b-button to="/" class="vw-button vw-button--primary vw-button--large">Back to Home</b-button>
  </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/base/variables';

.vw-not-found {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  &__title {
    color: $color-text;
    margin-bottom: 1.5rem;
  }
}
</style>
