<template>
  <b-modal id="modalUpdateStatistic" title="Edit profile" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Edit profile</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <div class="vw-info__avatar-col mb-4">
          <div @click="browseImage"
            class="vw_profile__avatar-inner"
            :style="{ 'background-image': 'url(' + updateData.avatar + ')' }"
          />
          <input type="file" name="file_upload"
          @change="updateFileUpload($event)"
          id="file_upload"
          accept="image/x-png,image/jpeg"
          ref="fileinput"
          class="d-none">
        </div>
        <div class="vw-form">
          <b-form-group
            class="vw-form__group"
            label="Username"
            label-class="vw-form__label"
            label-for="influencer-url"
            :state="!errors.has('name')"
            :invalid-feedback="errors.first('name')"
            >
            <b-form-input
              class="vw-form__control"
              placeholder="Enter name"
              name="name"
              v-validate="{ required: true }"
              v-model.trim="updateData.name"
              id="name">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors.first('name') }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            class="vw-form__group"
            label="Description"
            label-class="vw-form__label"
            label-for="influencer-url"
            :state="!errors.has('description')"
            :invalid-feedback="errors.first('description')"
            >
              <b-form-textarea
                id="description"
                v-model="updateData.description"
                name="description"
                placeholder="Enter something..."
                rows="6"
                max-rows="6"
              >
              </b-form-textarea>
            <b-form-invalid-feedback>
              {{ errors.first('description') }}
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>
    </template>
    <template slot="modal-footer">
      <b-button :class="inviteButtonClass" @click="handleSaveClick">
        <b-spinner small v-if="isSending"></b-spinner>
        <span v-else>Save</span>
      </b-button>
      <b-button class="vw-button vw-button--outline-secondary" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { toLower } from 'lodash'
import {
  UPDATE_INFLUENCER,
  UPLOAD_FILE,
  MAKE_TOAST
} from '@/store/action-types'
export default {
  name: 'modalUpdateStatistic',
  components: {},
  props: {
    avatar: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    influencerData: {
      type: Object
    }
  },
  data () {
    return {
      isSending: false,
      imgUrl: '',
      file: '',
      isImageUploading: false,
      updateData: {
        name: '',
        description: '',
        avatar: ''
      }
    }
  },
  computed: {
    ...mapState({
      croleName: state => state.user.currentUser.roleName
    }),
    inviteButtonClass () {
      let res = 'vw-button vw-button--primary'
      res += this.isSending ? ' vw-button--disabled' : ''
      return res
    }
  },
  methods: {
    ...mapActions({
      updateStatusInfluencer: `influencer/${UPDATE_INFLUENCER}`,
      uploadFile: `file/${UPLOAD_FILE}`,
      makeToast: `toast/${MAKE_TOAST}`
    }),
    resetForm () {
      this.updateData.name = ''
      this.updateData.description = ''
      this.updateData.avatar = ''
    },
    fetchData () {
      this.updateData.avatar = this.avatar ? this.avatar : 'https://via.placeholder.com/128'
      this.updateData.name = this.fullName
      this.updateData.description = this.description
    },
    browseImage () {
      this.$refs.fileinput.click()
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
        let fileName = 'avatar_' + toLower(this.updateData.name) + '_' + Date.now()
        formData.append('category', 'UserAvatar')
        formData.append('name', fileName)
        formData.append('files', input.files[0])
        // upload file
        this.isImageUploading = true
        this.uploadFile(formData).then(response => {
          if (response && response.success) {
            response.data.forEach(item => {
              this.updateData.avatar = item.thumbnailUrl
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
    async handleSaveClick () {
      if (!this.isSending || this.croleName !== 'Staff' || this.isImageUploading) {
        const isValid = await this.$validator.validateAll()
        if (isValid) {
          console.log(this.updateData.avatar)
          this.influencerData.fullName = this.updateData.name
          this.influencerData.stageName = this.updateData.name
          this.influencerData.description = this.updateData.description
          this.influencerData.avatar = Object.assign({},{ thumbnailUrl: this.updateData.avatar })
          console.log(this.influencerData)
          try {
            let res = await this.updateStatusInfluencer(this.influencerData)
            console.log(res)
          } catch (error) {
            console.log(error)
          } finally {
            // close
            this.handleCancelClick()
          }
        }
      }
    },
    handleCancelClick () {
      this.resetForm()
      this.$bvModal.hide('modalUpdateStatistic')
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
.vw_profile__avatar-inner {
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
    .vw_profile__avata-layer{
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
  }
</style>
