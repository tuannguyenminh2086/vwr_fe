<template>
  <section class="vw_report__list">
    <VWSection title="Report list">
    <!-- component -->
      <VWClientReport v-if="clientID" :cid="clientID" />
    <!-- component -->
    </VWSection>
  </section>
</template>

<script>
import {
  MAKE_TOAST
} from '@/store/action-types'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'ReportList',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    VWClientReport: () => import('@/components/Clients/reports/ClientReports.vue')
  },
  props: {
    cid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      clientID: ''
    }
  },
  computed: {
    ...mapState({
      cUser: state => state.user.currentUser
    })
  },
  methods: {
    ...mapActions({
      getLoggedUserData: 'user/getLoggedUserData',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async fetchData () {
      let res = await this.getLoggedUserData()
      if (res) {
        this.clientID = this.cUser.client._id
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>

</style>
