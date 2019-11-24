<template>
  <div class="vw-campaign">
    <VWSection :title="sectionName">
      <CampaignDetailForm :campaignType="campaignType" @onDetailFormMounted="handleDetailFormMounted"></CampaignDetailForm>
    </VWSection>
  </div>
</template>

<script>
export default {
  name: 'campaign-detail',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    CampaignDetailForm: () => import('@/components/Campaign/Detail/Detail.vue')
  },
  props: {
    campaignType: String
  },
  data () {
    return {
      sectionName: ''
    }
  },
  methods: {
    handleDetailFormMounted (name) {
      this.sectionName = name === 'Create Campaign' ? name : `Campaign: ${name}`
    }
  }
}
</script>

<style lang="scss">
</style>
