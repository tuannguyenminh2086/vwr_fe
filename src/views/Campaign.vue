<template>
  <div class="vw-campaign">
    <VWSection title="Campaign list">
      <!-- <CampaignList /> -->
      <ClientCampaign v-if="clientID" :cid="clientID" />
    </VWSection>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'campaign',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    CampaignList: () => import('@/components/Campaign/List/List.vue'),
    ClientCampaign: () => import('@/components/Clients/campaigns/ClientCampaigns.vue')
  },
  computed: {
    ...mapState({
      cUser: state => state.user.currentUser
    })
  },
  data () {
    return {
      clientID: ''
    }
  },
  methods: {
    ...mapActions({
      getLoggedUserData: 'user/getLoggedUserData'
    }),
    async fetchData () {
      let res = await this.getLoggedUserData()
      if(res) {
        this.clientID = this.cUser.client._id
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
</style>
