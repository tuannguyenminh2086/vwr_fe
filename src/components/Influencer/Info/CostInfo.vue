<template>
  <div class="vw-info__cost-info">
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <p class="vw-info__section-title">
        03. Cost
      </p>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <span class="vw-info__sub-title">FACEBOOK</span>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group
        label-for="influencer-cost-facebook-sharelink"
        class="vw-form__group"
        label="Sharelink"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-facebook-sharelink"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.facebookCost.shareLink"
          trim
          @input="handleFacebookCostShareLinkChange"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-for="influencer-cost-facebook-photo-post"
        class="vw-form__group"
        label="Photo post"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-facebook-photo-post"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.facebookCost.photoPost"
          trim
          @input="handleFacebookCostPhotoPostChange"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-for="influencer-cost-facebook-livestream"
        class="vw-form__group"
        label="Livestream"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-facebook-livestream"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.facebookCost.livestream"
          trim
          @input="handleFacebookCostLivestreamChange"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-for="influencer-cost-facebook-repost-video"
        class="vw-form__group"
        label="Repost Photo/ Video from brand"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-facebook-repost-video"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.facebookCost.repostOrVideo"
          trim
          @input="handleFaceBookCostRepostOrVideoChange"
          type="number"
        ></b-form-input>
      </b-form-group>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
        <span class="vw-info__sub-title">INSTAGRAM</span>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group
        label-for="influencer-cost-instagram-photo-cost"
        class="vw-form__group"
        label="Photo"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-instagram-photo-cost"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.instagramCost.photoPost"
          trim
          @input="handleInstagramCostPhotoPostChange"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-for="influencer-cost-instagram-video"
        class="vw-form__group"
        label="Video"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-instagram-video"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.instagramCost.video"
          @input="handleInstagramCostVideoChange"
          trim
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-for="influencer-cost-instagram-story"
        class="vw-form__group"
        label="Story"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-instagram-story"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.instagramCost.story"
          trim
          @input="handleInstagramCostStoryChange"
          type="number"
        ></b-form-input>
      </b-form-group>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <span class="vw-info__sub-title">YOUTUBE</span>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group
        label-for="influencer-cost-youtube-video"
        class="vw-form__group"
        label="Video"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-youtube-video"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.youtubeCost.video"
          trim
          @input="handleYoutubeCostVideoChange"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-for="influencer-cost-youtube-sharelink"
        class="vw-form__group"
        label="Share link on Community tab"
        label-class="vw-form__label"
      >
        <b-form-input
          id="influencer-cost-youtube-sharelink"
          class="vw-form__control"
          placeholder="Enter cost"
          :value="data.youtubeCost.shareLink"
          trim
          @input="handleYoutubeCostShareLinkChange"
          type="number"
        ></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>
<script>
import {
  UPDATE_FACEBOOK_COST_SHARE_LINK,
  UPDATE_FACEBOOK_COST_PHOTO_POST,
  UPDATE_FACEBOOK_COST_LIVESTREAM,
  UPDATE_FACEBOOK_COST_REPOST_OR_VIDEO,
  UPDATE_INSTAGRAM_COST_PHOTO_POST,
  UPDATE_INSTAGRAM_COST_VIDEO,
  UPDATE_INSTAGRAM_COST_STORY,
  UPDATE_YOUTUBE_COST_VIDEO,
  UPDATE_YOUTUBE_COST_SHARE_LINK
} from '@/eventBus-types'
export default {
  name: 'influencer-cost-info',
  props: {
    data: Object
  },
  methods: {
    handleFacebookCostShareLinkChange (value) {
      this.$geb.emit({ id: UPDATE_FACEBOOK_COST_SHARE_LINK, data: value })
    },
    handleFacebookCostPhotoPostChange (value) {
      this.$geb.emit({ id: UPDATE_FACEBOOK_COST_PHOTO_POST, data: value })
    },
    handleFacebookCostLivestreamChange (value) {
      this.$geb.emit({ id: UPDATE_FACEBOOK_COST_LIVESTREAM, data: value })
    },
    handleFaceBookCostRepostOrVideoChange (value) {
      this.$geb.emit({ id: UPDATE_FACEBOOK_COST_REPOST_OR_VIDEO, data: value })
    },
    handleInstagramCostPhotoPostChange (value) {
      this.$geb.emit({ id: UPDATE_INSTAGRAM_COST_PHOTO_POST, data: value })
    },
    handleInstagramCostVideoChange (value) {
      this.$geb.emit({ id: UPDATE_INSTAGRAM_COST_VIDEO, data: value })
    },
    handleInstagramCostStoryChange (value) {
      this.$geb.emit({ id: UPDATE_INSTAGRAM_COST_STORY, data: value })
    },
    handleYoutubeCostVideoChange (value) {
      this.$geb.emit({ id: UPDATE_YOUTUBE_COST_VIDEO, data: value })
    },
    handleYoutubeCostShareLinkChange (value) {
      this.$geb.emit({ id: UPDATE_YOUTUBE_COST_SHARE_LINK, data: value })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';
.vw-info {
  &__section-title {
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    color: $color-form-title;
  }
  &__sub-title {
    display: inline-block;
    margin-bottom: 1rem;
  }
  &__form {
    &-bottom-row {
      justify-content: flex-end;
    }
    &-col {
      padding-bottom: 0;
      @media screen and (width: 768px) {
        flex: 0 0 50%;
        max-width: 50%;
      }
      &--align-right {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
/deep/ input:placeholder-shown {
  color: #6c757d;
}
</style>
