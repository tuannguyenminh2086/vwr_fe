<template>
  <TableAction :isCallingAction="isCallingAction">
    <b-dropdown-item class="vw-table__table-actions-button" @click="handleClickRemoveInfluencer">Remove</b-dropdown-item>
  </TableAction>
</template>

<script>
import { mapActions } from 'vuex'
import {
  MAKE_TOAST,
  DELETE_INFLUENCER
} from '@/store/action-types'
import { modalConfirmConfig } from '@/variables'
import { roundResponseStatus } from '@/helper'

export default {
  name: 'influencer-list-item-action',
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
      _removeInfluencer: `influencer/${DELETE_INFLUENCER}`
    }),
    handleClickActions (event) {
      event.stopPropagation()
    },
    async handleClickRemoveInfluencer () {
      let { id, fullName } = this.actionData.item
      try {
        let value = await this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
        // Is Confirm
        if (value) {
          // Active Indicator
          this.isCallingAction = true
          // Delete Item
          let response = await this._removeInfluencer(id)

          if (roundResponseStatus(response.status) === 200) {
            // Show success message
            this.makeToast({
              title: 'Influencer was deleted',
              variant: 'success'
            })
            // Emit event to Parent
            this.$emit('onRemoveInfluencer')
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
          title: `Cannot delete ${fullName}`,
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
