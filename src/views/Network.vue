<template>
  <div class="vw-network">
    <VWSection centered title="Invite Influencer to network">
      <b-button class="vw-button vw-button--large vw-button--primary" v-b-modal.modal-invite>Invite</b-button>
    </VWSection>
    <VWSection title="Network">
      <!-- <InfluencerList /> -->
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>
      </transition>
    </VWSection>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'network',
  components: {
    VWSection: () => import('@/components/Section/Section.vue'),
    InfluencerList: () => import('@/components/Influencer/List/List.vue'),
    ClientInfluencerList: () => import('@/components/Clients/influencers/ClientInfluencer.vue')
  },
  computed: {
    ...mapState({
      cUser: state => state.user.currentUser
    })
  },
  data () {
    return {
      currentView: ''
    }
  },
  methods: {
    ...mapActions({
      getLoggedUserData: 'user/getLoggedUserData'
    }),
    async fetchData () {
      let res = await this.getLoggedUserData()
      if (res) {
        if (this.cUser.roleName === 'Super Admin') {
          this.currentView = 'InfluencerList'
        } else {
          this.currentView = 'ClientInfluencerList'
        }
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
</style>
