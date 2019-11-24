<template>
  <div class="vw-social__post-item">
    <PostThumbnail :imgUrl="postData.image" :imgInfo="postData.description" />
    <div class="vw-social__post-content">
      <div class="vw-social__post-content-group">
        <PostTitle :title="postData.title" :platform="platform" />
        <PostDescription :description="postData.description" />
      </div>
      <PostSeeMore :link="postData.link" />
      <PostReact
        :platform="platform"
        :like="postData.like"
        :comment="postData.comment"
        :share="postData.share"
        :view="postData.view"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'social-post',
  props: {
    platform: String,
    postData: Object
  },
  components: {
    PostThumbnail: () => import('./PostThumbnail'),
    PostTitle: () => import('./PostTitle'),
    PostDescription: () => import('./PostDescription'),
    PostSeeMore: () => import('./PostSeeMore'),
    PostReact: () => import('./PostReact')
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__post {
    &-item {
      display: flex;
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }
    &-content {
      padding-left: 2.5rem;
      font-size: 0.8125rem;
      &-group {
        min-height: 6.25rem;
      }
    }
  }
}
</style>
