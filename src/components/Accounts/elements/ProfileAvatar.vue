<template>
  <section class="vw_profile__avatar" :class="classHandle"  >
    <div
      class="vw_profile__avatar-inner"
      :class="{'has-avatar': hasAvatar}"
      data-placeholder="A"
      :style="{ 'background-image': 'url(' + imgUrl + ')' }"
    >
      <div class="vw_profile__avatar-layer" @click="browseImage">
        <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.4333 10.0333L19.9667 11.5667L4.86667 26.6667H3.33333V25.1333L18.4333 10.0333ZM24.4333 0C24.0167 0 23.5833 0.166667 23.2667 0.483333L20.2167 3.53333L26.4667 9.78333L29.5167 6.73333C30.1667 6.08333 30.1667 5.03333 29.5167 4.38333L25.6167 0.483333C25.2833 0.15 24.8667 0 24.4333 0ZM18.4333 5.31667L0 23.75V30H6.25L24.6833 11.5667L18.4333 5.31667Z" fill="white"/>
        </svg>
      </div>
    </div>
    <input type="file" name="file_upload"
          @change="updateFileUpload($event)"
          id="file_upload"
          accept="image/x-png,image/jpeg"
          ref="fileinput"
          class="d-none">
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { toLower } from 'lodash'
import {
  UPLOAD_FILE,
  MAKE_TOAST
} from '@/store/action-types'

export default {
  name: 'ProfileAvatar',
  props: {
    avatarUrl: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    userData: {
      type: Object
    },
    owner: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    hasAvatar () {
      return (this.avatarUrl && this.avatarUrl !== '') === true
    },
    classHandle () {
      return this.owner ? 'is-owner' : ''
    }
  },
  data () {
    return {
      imgUrl: '',
      placeholder: '',
      file: '',
      isImageUploading: false
    }
  },
  methods: {
    ...mapActions({
      uploadFile: `file/${UPLOAD_FILE}`,
      updateUserById: 'user/updateUserById',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    initAvatar () {
      if (this.avatarUrl && this.avatarUrl !== '') { this.imgUrl = this.avatarUrl }
    },
    updateFileUpload (event) {
      let input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imgUrl = e.target.result
        }
        reader.readAsDataURL(input.files[0])
        let formData = new FormData()
        let fileName = 'avatar_' + toLower(this.name) + '_' + Date.now()
        formData.append('category', 'UserAvatar')
        formData.append('name', fileName)
        formData.append('files', input.files[0])
        // upload file
        this.isImageUploading = true
        this.uploadFile(formData).then(response => {
          if (response && response.success) {
            response.data.forEach(item => {
              this.userData.avatar = item.thumbnailUrl
              this.updateUserById(this.userData).then(resp => {
                if (resp) {
                  if (resp.status === 200) {
                    this.makeToast({
                      title: 'Update successful!!!',
                      variant: 'success'
                    })
                    this.file = input.files[0]
                  }
                }
              }).catch(error => {
                console.log(error)
                this.makeToast({
                  title: 'Have a problems',
                  variant: 'danger'
                })
              })
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
      }
    },
    browseImage () {
      if (this.owner) {
        this.$refs.fileinput.click()
      }
    }
  },
  mounted () {
    this.initAvatar()
  }
}
</script>

<style lang="scss">
  .vw_profile {
    &__avatar {
      $self: &;
      &-inner {
        background-color: #555C93;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
      }
      &::after {
        content: 'A';
        display: block;
        font-size: 5rem;
        color: #fff;
        position: absolute;
        top: 50px;
        left: 50%;
        margin-left: -30px;
        width: 60px;
        height: 60px;
        text-align: center;
        z-index: 1;
        line-height: 60px;
      }
      &.is-owner{
        #{ $self }-layer{
          background:rgba(56, 120, 243, 0.6);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 330ms ease-in-out;
          position: relative;
          z-index: 2;
        }

        &:hover {
          #{ $self }-layer { opacity: 1;}
        }
        &.has-avatar{
          &:after{
            display: none
          }
        }
      }
    }
  }
</style>
