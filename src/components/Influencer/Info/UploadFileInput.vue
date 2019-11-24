<template>
  <div class="vw-info__upload-file">
    <div class="vw-info__files-review" v-if="value.length && value.length > 0">
      <div class="vw-info__file-item" v-for="file in value" :key="file._id">
        <span class="vw-info__file-name">{{file.fileName}}</span>
        <span class="vw-info__file-remove" @click="handleRemoveImage(file._id)">
          <Icon name="close"/>
        </span>
      </div>
    </div>
    <div class="vw-info__file-input-wrapper">
      <b-spinner small v-if="isUploading"></b-spinner>
      <span class="vw-info__file-input-label" @click="$refs.fileInput.click()" v-else>
        <Icon class="vw-info__file-input-icon" name="upload"/>
        <span>Upload Image</span>
      </span>
      <input
        class="vw-info__file-input"
        type="file"
        :multiple="multiple ? multiple : false"
        :accept="accept ? accept : false"
        @change="updateValue"
        ref="fileInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload-file-input',
  props: {
    accept: String,
    multiple: Boolean,
    value: Array,
    isUploading: Boolean
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  methods: {
    updateValue (value) {
      this.$emit('change', value)
    },
    handleRemoveImage (removeImageId) {
      let filterValue = this.value.filter(item => {
        return item._id !== removeImageId
      })
      this.$emit('update', filterValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';
.vw-info {
  &__upload-file {
    margin-left: 2rem;
    font-size: 0.8125rem;
  }
  &__files{
    &-review {
      display: inline-block;
      margin-bottom: 1rem;
    }
  }
  &__file {
    &-item {
      padding: 0.3125rem;
      color: $color-main;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.25rem;
      border-radius: 0.25rem;
      background-color: $color-app-bg;
    }
    &-name {
      padding-left: 0.875rem;
    }
    &-remove {
      padding: 0 1.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    &-input {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      &-wrapper {
        color: $color-main;
        cursor: pointer;
      }
      &-label {
        display: flex;
      }
      &-icon {
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
