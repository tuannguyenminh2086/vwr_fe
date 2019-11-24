<template>
  <div class="vw-info__identity">
    <div class="vw-form__row">
      <p class='vw-info__section-title'>
        Identity Card
      </p>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group
        class='vw-form__group'
        label='Card number'
        label-class='vw-form__label'
      >
        <b-form-input
          class='vw-form__control'
          placeholder='Enter Card number'
          :value='data.idCard.cardNumber'
          trim
          @input='handleCardNumberChange'
          ></b-form-input>
      </b-form-group>
      <b-form-group
        class='vw-form__group'
        label='Issue Date'
        label-class='vw-form__label'
      >
        <VWDatepicker
          :value='data.idCard.issueDate'
          @input='influencerCardIssueDateSelected'
        ></VWDatepicker>
      </b-form-group>
      <b-form-group
        class='vw-form__group'
        label='Issue Place'
        label-class='vw-form__label'
      >
        <VWMultiSelect :value="cityOptions.find(x => x._id === data.idCard.issuePlace) ? {_id: data.idCard.issuePlace, name: cityOptions.find(x => x._id === data.idCard.issuePlace).name} : null" inputId="influencer-issue-place" placeholder="Select" :options="cityOptions" :configs="{...multiSelectConfigs, multiple: false, label: 'name', trackBy: 'name'}" @onInput="handleCardIssuePlaceChange" customValue="_id"></VWMultiSelect>
      </b-form-group>
    </div>
    <b-row class="vw-info__form-row">
      <b-col class="vw-info__form-col" md="1" sm="1" cols="1">
        <label class="vw-form__label">Images:</label>
      </b-col>
      <b-col class="vw-info__form-col" md="4" sm="6" cols="12">
        <upload-file-input :value="data.idCard.issueImages" multiple accept="image/*"
          @change="issueImagesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          @update="issueImagesUpdate"
          :isUploading="isImageUploading"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { formatDate } from '@/helper'
import { mapActions } from 'vuex'
import {
  UPDATE_CARD_NUMBER,
  UPDATE_CARD_ISSUE_DATE,
  UPDATE_CARD_ISSUE_PLACE,
  UPDATE_CARD_ISSUE_IMAGES
} from '@/eventBus-types'
import {
  UPLOAD_FILE,
  MAKE_TOAST
} from '@/store/action-types'
import { multiSelectConfigs } from '@/variables'
export default {
  name: 'influencer-identity-info',
  components: {
    VWDatepicker: () => import('@/components/VWDatepicker/VWDatepicker'),
    UploadFileInput: () => import('./UploadFileInput'),
    VWMultiSelect: () => import('@/components/Elements/MultiSelect.vue')
  },
  data () {
    return {
      isImageUploading: false,
      multiSelectConfigs: multiSelectConfigs
    }
  },
  props: {
    data: Object,
    cityOptions: Array
  },
  methods: {
    ...mapActions({
      uploadFile: `file/${UPLOAD_FILE}`,
      makeToast: `toast/${MAKE_TOAST}`
    }),

    handleCardNumberChange (value) {
      this.$geb.emit({ id: UPDATE_CARD_NUMBER, data: value })
    },

    influencerCardIssueDateSelected (value) {
      let convertedDate = formatDate(value)
      this.$geb.emit({ id: UPDATE_CARD_ISSUE_DATE, data: convertedDate })
    },

    handleCardIssuePlaceChange (value) {
      this.$geb.emit({ id: UPDATE_CARD_ISSUE_PLACE, data: value })
    },

    // Upload new Image
    issueImagesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      if (!fileList.length) return
      // Append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(index => {
          formData.append('category', 'InfluencerIssueImage')
          formData.append('name', fileList[index].name)
          formData.append('files', fileList[index])
        })
      this.isImageUploading = true
      this.uploadFile(formData).then(response => {
        if (response && response.success) {
          response.data.forEach(item => {
            let value = { _id: item._id, thumbnailUrl: item.thumbnailUrl, fileName: item.fileName }
            // console.log(this.data.idCard.issueImages)
            this.$geb.emit({ id: UPDATE_CARD_ISSUE_IMAGES, data: [...this.data.idCard.issueImages, value] })
          })
        }
      }).catch(error => {
        console.log(error)
        this.makeToast({
          title: 'Can not upload image',
          variant: 'danger'
        })
      }).finally(() => {
        this.isImageUploading = false
      })
    },
    // Remove file in file list
    issueImagesUpdate (newFileList) {
      this.$geb.emit({ id: UPDATE_CARD_ISSUE_IMAGES, data: newFileList })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';
.vw-info {
  &__section-title {
    margin-top: 1rem;
    color: $color-form-title;
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
    &-issue-image {
      border: 1px solid $color-app-bg;
      padding: 5px;
    }
  }
}
/deep/ .vw-form {
  &__group {
    margin-bottom: 1rem;
  }
}
</style>
