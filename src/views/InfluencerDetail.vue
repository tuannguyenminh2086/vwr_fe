<template>
  <div class="vw-network">
    <VWSection title="Influencer's profile" noPadding>
      <b-tabs class="vw-tabs">
        <b-tab title="Basic information" class="vw-tabs__content" active>
          <InfluencerInfo></InfluencerInfo>
        </b-tab>
        <b-tab title="Facebook" class="vw-tabs__content" v-if="facebookInfo">
          <SocialInfo :info="facebookInfo"/>
        </b-tab>
        <b-tab title="Youtube" class="vw-tabs__content" v-if="youtubeInfo">
          <SocialInfo :info="youtubeInfo"/>
        </b-tab>
        <b-tab title="Instagram" class="vw-tabs__content" v-if="instagramInfo">
          <SocialInfo :info="instagramInfo"/>
        </b-tab>
      </b-tabs>
    </VWSection>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  GET_SOCIALS_INFLUENCER,
  MAKE_TOAST,
  GET_CITY_LIST
} from '@/store/action-types'

export default {
  name: 'influencer-detail',
  components: {
    VWSection: () => import('@/components/Section/Section.vue'),
    InfluencerInfo: () => import('@/components/Influencer/Info/Info.vue'),
    SocialInfo: () => import('@/components/Influencer/SocialInfo/SocialInfo.vue')
  },
  data () {
    return {
      isLoading: false,
      socials: []
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    facebookInfo () {
      return this.socials.find(item => item.platform === 'Facebook')
    },
    youtubeInfo () {
      return this.socials.find(item => item.platform === 'YouTube')
    },
    instagramInfo () {
      return this.socials.find(item => item.platform === 'Instagram')
    }
  },
  methods: {
    ...mapActions({
      getSocialsInfluencer: `influencer/${GET_SOCIALS_INFLUENCER}`,
      getDataHub: `dataHub/getDataHubByClient`,
      getCityList: `address/${GET_CITY_LIST}`,
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async _getSocialsInfluencer () {
      try {
        // Active indicator
        this.isLoading = true
        // Get API
        let response = await this.getSocialsInfluencer(this.$route.params.id)
        // console.log(response)
        if (response.data && response.data.success) {
          // Update socials list
          this.socials = response.data.data
        }
      } catch (error) {
        // eslint-disable-console
        console.log(error)
      } finally {
        // Deactive indicator
        this.isLoading = false
      }
    },
    async fetchData () {
      try {
        // Get API
        await this.getDataHub()
        await this.getCityList()
        await this._getSocialsInfluencer()
      } catch (error) {
        // eslint-disable-console
        this.makeToast({
          title: 'Can not get data',
          variant: 'danger'
        })
      } finally {
        // console.log('done')
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped></style>
