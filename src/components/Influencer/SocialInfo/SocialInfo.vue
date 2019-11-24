<template>
  <div class="vw-social" v-if="info">
    <div class="vw-social__info">
      <div class="vw-social__avatar">
        <InfluencerAvatar :imgUrl="info.imageUrl" imgInfo="Influencer Name" />
        <SocialLink :platform="platform" :label="platform" :link="info.link"/>
      </div>
      <div class="vw-social__content">
        <SocialName :name="info.socialName" />
        <div class="vw-social__statistic-group">
          <SocialStatistic label="Average Engagement:" :value="info.averageEngagement | formatNumber" v-if="info.averageEngagement"/>
          <SocialStatistic label="Average View:" :value="info.averageView | formatNumber" v-if="info.averageView"/>
          <SocialStatistic label="Total reach (last 30 days):" :value="info.totalReach | formatNumber" v-if="info.totalReach"/>
        </div>
        <div class="vw-social__group-box">
          <SocialAudience :label="audienceLabel" :value="info.audience | formatNumber" :level="socialLevel"/>
          <SocialEngagementRate :percent="info.engagementRate | roundPercent" chartColor="#1ec53b"/>
        </div>
      </div>
    </div>
    <SocialInsight
      :platform="platform"
      :fanInsightGender="fanInsightGender"
      :genderColorData="genderColorData"
      :fanInsightAge="fanInsightAge"
      :ageColorData="ageColorData"
      :fanInsightLocation="fanInsightLocation"
      :locationColorData="locationColorData"/>
    <SocialPosts :platform="platform"/>
  </div>
</template>

<script>
import {
  genderEnum,
  socialLevelEnum,
  genderColor,
  ageColor,
  locationColor
} from '@/variables'

export default {
  name: 'social-info',
  props: {
    info: Object
  },
  components: {
    InfluencerAvatar: () => import('@/components/Influencer/Avatar/Avatar.vue'),
    SocialLink: () => import('./Link'),
    SocialName: () => import('./Name'),
    SocialStatistic: () => import('./Statistic'),
    SocialAudience: () => import('./Audience'),
    SocialEngagementRate: () => import('./EngagementRate'),
    SocialInsight: () => import('./Insight'),
    SocialPosts: () => import('./Posts')
  },
  data () {
    return {
      genderColorData: genderColor,
      ageColorData: ageColor,
      locationColorData: locationColor
    }
  },
  computed: {
    platform () {
      return this.info.platform.toLowerCase()
    },
    audienceLabel () {
      return this.info.platform === 'Facebook' ? 'Follower' : 'Subcriber'
    },
    socialLevel () {
      return socialLevelEnum.find(x => this.info.level === x._id)
    },
    fanInsightGender () {
      let chartData = this.info ? this.info.fanInsightGender : []
      return chartData.map(item => {
        return {
          percent: item.percent,
          label: genderEnum.find(x => item.gender === x._id).label
        }
      })
    },
    fanInsightAge () {
      let chartData = this.info ? this.info.fanInsightAge : []
      return chartData.map(item => {
        return {
          percent: item.percent,
          label: item.to ? `${item.from} - ${item.to}` : `${item.from}+`
        }
      })
    },
    fanInsightLocation () {
      let chartData = this.info ? this.info.fanInsightLocation : []
      return chartData.map(item => {
        return {
          percent: item.percent,
          label: item.location
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__info {
    display: flex;
    margin-bottom: 1.6875rem;
  }
  &__statistic {
    &-group {
      min-height: 3.5rem;
      margin-bottom: 1rem;
    }
  }
  &__group-box {
    display: flex;
    flex-wrap: wrap;
  }
  &__content {
    flex: 1 0 auto;
    padding-left: 1.5rem;
    .vw-social__group-box {
      margin: 0 -0.8125rem;
    }
  }
}

</style>
