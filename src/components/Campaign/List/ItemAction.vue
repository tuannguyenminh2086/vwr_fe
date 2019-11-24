<template>
  <TableAction :isCallingAction="isCallingAction">
    <b-dropdown-item class="vw-table__table-actions-button" @click="handleClickRemoveCampaign">Remove</b-dropdown-item>
  </TableAction>
</template>

<script>
import { mapActions } from 'vuex'
import {
  MAKE_TOAST,
  DELETE_CAMPAIGN
} from '@/store/action-types'
import { modalConfirmConfig } from '@/variables'
import { roundResponseStatus } from '@/helper'

export default {
  name: 'campaign-list-item-action',
  props: {
    actionData: Object
  },
  components: {
    TableAction: () => import('@/components/Table/ItemAction.vue')
  },
  data () {
    return {
      isCallingAction: false
    }
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      _deleteCampaign: `campaign/${DELETE_CAMPAIGN}`
    }),
    handleClickActions (event) {
      event.stopPropagation()
    },
    async handleClickRemoveCampaign () {
      let { id, name } = this.actionData.item
      try {
        let value = await this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
        // Is Confirm
        if (value) {
          // Active Indicator
          this.isCallingAction = true
          // Delete item
          let response = await this._deleteCampaign(id)

          if (roundResponseStatus(response.status) === 200) {
            // Show success message
            this.makeToast({
              title: 'Campaign was deleted',
              variant: 'success'
            })
            // Emit event to Parent
            this.$emit('onRemoveCampaign')
          } else {
            // Show error message
            this.makeToast({
              title: 'Something went wrong',
              variant: 'danger'
            })
          }
        }
      } catch (error) {
        // eslint-disable-console
        console.log(error)
        // Show error
        this.makeToast({
          title: `Cannot delete ${name}`,
          variant: 'danger'
        })
      } finally {
        // Deactive Indicator
        this.isCallingAction = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
