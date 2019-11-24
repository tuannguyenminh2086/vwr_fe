<template>
  <div class="vw-campaign__modal-actions">
    <b-button class="vw-button vw-button--primary" @click="handleClick">Add</b-button>
    <b-button class="vw-button vw-button--outline-secondary" @click="handleCancel">Cancel</b-button>
  </div>
</template>

<script>
import {
  ADD_FILTERED_INFLUENCER_TO_CAMPAIGN,
  CANCEL_FILTER_INFLUENCER_CAMPAIGN
} from '@/eventBus-types'
export default {
  name: 'campaign-modal-influencer-filter-modal-actions',
  data () {
    return {
    }
  },
  methods: {
    handleClick () {
      this.$geb.emit({
        id: ADD_FILTERED_INFLUENCER_TO_CAMPAIGN
      })
    },
    handleCancel () {
      this.$geb.emit({
        id: CANCEL_FILTER_INFLUENCER_CAMPAIGN
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vw-campaign {
  &__modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    margin-bottom: 0;
  }
}
</style>
