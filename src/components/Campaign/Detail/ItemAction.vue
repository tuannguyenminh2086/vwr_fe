<template>
  <TableAction>
    <b-dropdown-item class="vw-table__table-actions-button" @click="handleClickEditCost">Edit Cost</b-dropdown-item>
    <b-dropdown-item class="vw-table__table-actions-button" @click="handleClickRemoveInfluencer">Remove</b-dropdown-item>
  </TableAction>
</template>

<script>
export default {
  name: 'campaign-list-item-action',
  props: {
    itemData: Object
  },
  components: {
    TableAction: () => import('@/components/Table/ItemAction.vue')
  },
  data () {
    return {
    }
  },
  methods: {
    handleClickActions (event) {
      event.stopPropagation()
    },
    handleClickEditCost () {
      this.$emit('onToggleEditCost', this.itemData.item._id)
    },
    handleClickRemoveInfluencer () {
      this.$emit('onRemoveInfluencer', this.itemData.item._id)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
