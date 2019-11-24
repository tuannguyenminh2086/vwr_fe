<template>
  <div class="vw-campaign__form-footer">
    <b-button class="vw-button vw-button--link-primary vw-button--has-icon" @click="handleClickReset">
      <Icon class="vw-button__icon" name="reset"></Icon>
      <span class="vw-button__label">Reset filters</span>
    </b-button>
    <b-button class="vw-button vw-button--outline-primary" @click="handleclickFilter">Filter</b-button>
  </div>
</template>

<script>
import {
  FILTER_CAMPAIGN_INFLUENCER,
  RESET_FILTER_CAMPAIGN_INFLUENCER
} from '@/eventBus-types'

export default {
  name: 'campaign-modal-influencer-filter-form-footer',
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  data () {
    return {
    }
  },
  methods: {
    handleClickReset () {
      this.$geb.emit({
        id: RESET_FILTER_CAMPAIGN_INFLUENCER
      })
    },
    handleclickFilter () {
      this.$geb.emit({
        id: FILTER_CAMPAIGN_INFLUENCER
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-campaign {
  &__form {
    &-footer {
      display: flex;
      margin-top: 1rem;
      padding-top: 1.75rem;
      align-items: center;
      justify-content: space-between;
      border-top: 0.0625rem solid $color-border;
    }
  }
}
</style>
