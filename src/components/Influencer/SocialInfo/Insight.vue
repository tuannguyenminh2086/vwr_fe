<template>
  <div class="vw-social__insight">
    <SocialSectionLabel :label="sectionLabel" />
    <div class="vw-social__group-box">
      <SocialInsightBox
        label="Gender"
        :chartName="`${platform}-gender`"
        :chartData="fanInsightGender"
        :colorData="genderColorData"/>
      <SocialInsightBox
        label="Age"
        :chartName="`${platform}-age`"
        :chartData="fanInsightAge"
        :colorData="ageColorData"/>
      <SocialInsightBox
        label="Location"
        :chartName="`${platform}-location`"
        :chartData="fanInsightLocation"
        :colorData="locationColorData"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'social-insight',
  props: {
    sectionLabel: {
      type: String,
      default: 'Fan insight:'
    },
    platform: String,
    fanInsightGender: Array,
    genderColorData: Array,
    fanInsightAge: Array,
    ageColorData: Array,
    fanInsightLocation: Array,
    locationColorData: Array
  },
  components: {
    SocialSectionLabel: () => import('./SectionLabel'),
    SocialInsightBox: () => import('./InsightBox')
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__insight {
    margin-bottom: 2.5rem;
    .vw-social__group-box {
      display: grid;
      grid-gap: 1.625rem;
      grid-template-columns: repeat(3, 1fr);
      @media screen and (max-width: 1280px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
