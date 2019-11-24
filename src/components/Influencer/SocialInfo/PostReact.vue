<template>
  <div class="vw-social__post-react-list">
    <div class="vw-social__post-react">
      <Icon name="thumbs-up" />
      <span class="vw-social__post-react-value">{{ like | formatNumber }}</span>
    </div>
    <div class="vw-social__post-react" v-if="platform === 'youtube'">
      <Icon name="eye" />
      <span class="vw-social__post-react-value">{{ view | formatNumber }}</span>
    </div>
    <div class="vw-social__post-react">
      <Icon name="comment" />
      <span class="vw-social__post-react-value">{{ comment | formatNumber }}</span>
    </div>
    <div class="vw-social__post-react" v-if="platform === 'facebook'">
      <Icon name="share" />
      <span class="vw-social__post-react-value">{{ share | formatNumber }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'social-post-react',
  props: {
    platform: String,
    like: [String, Number],
    comment: [String, Number],
    share: [String, Number],
    view: [String, Number]
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__post {
    &-react {
      display: flex;
      margin: 0 2rem 1rem;
      align-items: center;
      @media screen and (max-width: 991px) {
        margin: 0 1rem 1rem;
      }
      &-list {
        display: flex;
        margin: 0 -2rem;
        flex-wrap: wrap;
        @media screen and (max-width: 991px) {
          margin: 0 -1rem;
        }
      }
      &-value {
        padding-left: 0.5rem;
      }
    }
  }
}
</style>
