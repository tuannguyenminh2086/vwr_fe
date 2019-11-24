<template>
  <div class="vw-social__post-thumbnail">
    <img class="vw-social__post-thumbnail-image" :src="imgUrl" :alt="imgInfo" v-if="!isVideo"/>
    <video class="vw-social__post-thumbnail-video" autoplay v-else>
      <source :src="imgUrl" type="video/mp4">
    </video>
  </div>
</template>

<script>
import { regExp } from '@/variables'

export default {
  name: 'social-post-thumbnail',
  props: {
    imgUrl: String,
    imgInfo: String
  },
  computed: {
    isVideo () {
      return regExp.thumbnailVideo.test(this.imgUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-social {
  &__post {
    &-thumbnail {
      position: relative;
      flex: 1 0 12.5rem;
      max-width: 12.5rem;
      height: 11rem;
      overflow: hidden;
      border-radius: 0.25rem;
      box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
      &-image,
      &-video {
        position: absolute;
        max-width: none;
        max-height: 120%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

</style>
