<template>
  <div class="vw-table__control-pagination">
    <b-pagination
      :value="currentPage"
      :total-rows="total"
      @change="handlePaginationChange"
      :per-page="itemsPerPage">
      <template slot="first-text">
        <Icon name="angle-double-left"/>
      </template>
      <template slot="prev-text">
        <Icon name="angle-left"/>
      </template>
      <template slot="next-text">
        <Icon name="angle-right"/>
      </template>
      <template slot="last-text">
        <Icon name="angle-double-right"/>
      </template>
    </b-pagination>
  </div>
</template>

<script>
export default {
  name: 'vw-table-pagination',
  props: {
    currentPage: Number,
    total: Number,
    itemsPerPage: Number
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  methods: {
    handlePaginationChange (value) {
      // Update currentPage
      this.$emit('update:currentPage', value)
      // Emit event
      this.$emit('onChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-table {
  &__control {
    &-pagination {
      font-size: 0.8125rem;
      padding-left: 2rem;
      /deep/ .pagination {
        margin: 0 -0.25rem;
      }
      /deep/ .page-item {
        padding: 0 0.25rem;
        &.active {
          .page-link {
            color: $color-white;
            border-color: $color-main;
            background-color: $color-main;
          }
        }
        .page-link {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          color: $color-subtext;
          width: 2rem;
          height: 2rem;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          border: 0.0625rem solid $color-border;
        }
      }
      /deep/ .vw-icon {
        svg {
          width: 0.75rem;
        }
      }
    }
  }
}
</style>
