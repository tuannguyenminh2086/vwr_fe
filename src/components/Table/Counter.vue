<template>
  <div class="vw-table__control-total">Total: {{ total | formatNumber }}</div>
</template>

<script>
export default {
  name: 'vw-table-counter',
  props: {
    total: Number
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-table {
  &__control {
    &-total {
      font-size: 0.8125rem;
      color: $color-subtext;
    }
  }
}
</style>
