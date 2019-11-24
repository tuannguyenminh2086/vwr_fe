<template>
  <Loading v-if="isLoading"/>
  <div class="vw-social__post" v-else>
    <SocialSectionLabel :label="sectionLabel"/>
    <div class="vw-social__post-list">
      <Post
        v-for="item in postsList"
        :platform="platform"
        :postData="item"
        :key="item.id" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_SOCIALS_POST } from '@/store/action-types'

export default {
  name: 'social-posts',
  props: {
    platform: String
  },
  components: {
    SocialSectionLabel: () => import('./SectionLabel'),
    Loading: () => import('@/components/Loading/Loading.vue'),
    Post: () => import('./Post')
  },
  data () {
    return {
      isLoading: false,
      postsList: []
    }
  },
  computed: {
    sectionLabel () {
      let leng = this.postsList.length
      return `${leng > 9 || leng < 1 ? leng : '0' + leng} top ${this.platform === 'youtube' ? 'video' : 'post'}${leng > 1 ? 's' : ''}`
    }
  },
  methods: {
    ...mapActions({
      _getSocialsPost: `influencer/${GET_SOCIALS_POST}`
    }),
    async getSocialsPost () {
      try {
        // Active Indicator
        this.isLoading = true
        // Get API
        let response = await this._getSocialsPost({
          influencerId: this.$route.params.id,
          platform: this.platform,
          limit: 3
        })
        if (response.data && response.data.success) {
          // Update posts list
          this.postsList = response.data.data
        }
      } catch (error) {
        // eslint-disable-console
        console.log(error)
      } finally {
        // Deactive Indicator
        this.isLoading = false
      }
    }
  },
  mounted () {
    this.getSocialsPost()
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__post {
  }
}
</style>
