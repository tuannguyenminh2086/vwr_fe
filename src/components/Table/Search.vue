<template>
  <div class="vw-table__control-search">
    <span class="vw-table__control-icon">
      <Icon name="search" />
    </span>
    <input
      class="vw-table__control-search-input"
      :value="query"
      type="text"
      placeholder="Search here"
      @input="handleInput"
      @keyup.esc="handleClear">
    <span class="vw-table__control-icon vw-table__control-icon--right" @click="handleClear" v-show="query">
      <Icon name="close"/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'vw-table-search',
  props: {
    query: String
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  methods: {
    handleInput (e) {
      this.$emit('update:query', e.target.value)
      this.$emit('onInput', e.target.value)
    },
    handleClear () {
      this.$emit('onClear')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-table {
  &__control {
    &-search {
      position: relative;
      &-input {
        width: 100%;
        font-size: 0.8125rem;
        padding: 0.875rem 3rem;
        border-radius: 0.25rem;
        border: 0.0625rem solid $color-border;
      }
    }
    &-icon {
      position: absolute;
      top: 50%;
      left: 1.1875rem;
      width: 1.125rem;
      height: 1.125rem;
      color: $color-subtext;
      transform: translateY(-50%);
      &--right {
        left: auto;
        right: 0;
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        &:hover {
          color: $color-text;
        }
        /deep/ svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
}
</style>
