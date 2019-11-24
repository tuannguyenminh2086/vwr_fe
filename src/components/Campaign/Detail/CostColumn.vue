<template>
  <span class="vw-table__table-cost">
    <span v-if="!itemData.isEditingCost">$ {{ itemData.localCost | formatNumber }}</span>
    <span class="vw-table__table-cost-edit-wrapper" v-else>
      <span class="vw-table__table-cost-label">$ </span>
      <b-form-input autofocus class="vw-table__table-cost-edit" :value="itemData.localCost" @input="handleInput" @blur="handleBlur" @focus="handleFocus" type="number" min="0"></b-form-input>
    </span>
  </span>
</template>

<script>
export default {
  name: 'campaign-influencer-list-cost',
  props: {
    itemData: Object
  },
  data () {
    return {
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('onInput', {
        id: this.itemData._id,
        value: value
      })
    },
    handleBlur () {
      this.$emit('onSave', this.itemData._id)
    },
    handleFocus (e) {
      e.target.select()
    }
  }
}
</script>

<style lang="scss" scoped>
.vw-table {
  &__table {
    &-cost {
      &-label {
        padding-right: 0.5rem;
      }
      &-edit {
        height: auto;
        text-align: right;
        font-size: 0.8125rem;
        line-height: 1.15;
        padding: 0.25rem;
        min-width: 5rem;
        &-wrapper {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
