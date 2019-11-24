<template>
  <div class="vw-table__table-actions">
    <b-dropdown
      v-if="!isCallingAction"
      class="vw-table__table-actions-toggle"
      @click="handleClickActions">
      <template slot="button-content">
        <Icon name="ellipsis-h" />
      </template>
      <slot></slot>
    </b-dropdown>
    <b-spinner variant="primary" small class="vw-table__table-loading-icon" v-else></b-spinner>
  </div>
</template>

<script>
export default {
  name: 'vw-table-item-action',
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  props: {
    isCallingAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleClickActions () {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
