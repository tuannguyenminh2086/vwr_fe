<template>
  <VWSection :title="'Client: ' + title" noPadding class="vw_client__detail">
    <b-tabs class="vw-tabs">
      <b-tab title="Accounts" class="vw-tabs__content" active>
        <VWClientAccounts :client-detail="client" />
      </b-tab>
      <b-tab title="Campaigns" class="vw-tabs__content">
        <component
          :is="currentCampaignComponent"
          :cid="$route.params.id"
        />
      </b-tab>
      <b-tab title="Reports" class="vw-tabs__content">
        <component
          :is="currentReportComponent"
          :cid="$route.params.id"
        />
      </b-tab>
    </b-tabs>
  </VWSection>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  ADD_CHILD_BREADCRUMB
} from '@/store/action-types'

export default {
  name: 'ClientDetail',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    VWClientAccounts: () => import('./ClientAccounts'),
    VWClientCampaigns: () => import('./ClientCampaigns.vue'),
    VWClientReports: () => import('./reports/ClientReports')
  },
  computed: {
    ...mapState({
      clientInfo: state => state.clients.detail
    })
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData',
    clientInfo: function (val) {
      this.client = Object.assign({}, val)
      this.add_child_breadcrumb({ label: this.client.name })
      this.title = this.client.name
    }
  },
  data () {
    return {
      title: '',
      client: null,
      hasAdmin: false,
      currentReportComponent: 'VWClientReports',
      currentCampaignComponent: 'VWClientCampaigns'
    }
  },
  methods: {
    ...mapActions({
      getClientById: 'clients/getClientById',
      getUserById: 'user/getUserById',
      resetData: 'clients/resetData',
      add_child_breadcrumb: `breadcrumb/${ADD_CHILD_BREADCRUMB}`
    }),
    async fetchData () {
      let { id } = this.$route.params
      if (typeof id !== 'undefined') {
        await this.getClientById(id)
      }
    }
  },
  created () {
    this.fetchData()
  },
  destroyed () {
    // this.resetData()
  }
}
</script>

<style lang="scss">
  .vw_client__detail{
    .vw-tabs__content{
      padding: 3rem;
    }
  }
</style>
