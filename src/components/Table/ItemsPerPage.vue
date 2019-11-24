<template>
  <div class="vw-table__control-select">
    <span>Shows</span>
    <b-form-select
      :value="itemsPerPage"
      @change="handlePerPageChange"
      :options="optionItemsPerPage"/>
    <span>items</span>
  </div>
</template>

<script>
export default {
  name: 'vw-table-item-per-page',
  props: {
    itemsPerPage: Number,
    optionItemsPerPage: Array
  },
  methods: {
    handlePerPageChange (value) {
      // Update itemsPerPage
      this.$emit('update:itemsPerPage', value)
      // Emit event
      this.$emit('onChange')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-table {
  &__control {
    &-select {
      display: flex;
      align-items: center;
      font-size: 0.8125rem;
      color: $color-black;
      .custom-select {
        border: 0;
        font-size: 0.8125rem;
        color: $color-text;
        &:focus {
          outline: 0;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
