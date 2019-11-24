<template>
  <b-modal id="modalAddCate" title="Add new Category" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Add new Category</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="Add new Category"
          label-class="vw-form__label"
          label-for="influencer-url"
          :state="!errors.has('name')"
          :invalid-feedback="errors.first('name')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter name"
            trim
            autofocus
            name="name"
            v-validate="{ required: true }"
            v-model="cateName"
            id="name">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('name') }}
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
    </template>
    <template slot="modal-footer">
      <b-button :class="inviteButtonClass" @click="handleSaveClick">
        <b-spinner small v-if="isSending"></b-spinner>
        <span v-else>Save</span>
      </b-button>
      <b-button class="vw-button vw-button--dark" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {
  MAKE_TOAST
} from '@/store/action-types'

export default {
  name: 'addNewCate',
  props: {
    typeId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isSending: false,
      cateName: ''
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
      addNewCate: 'dataHub/addNewCate',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    resetForm () {
      this.cateName = ''
    },
    async handleSaveClick () {
      if (this.croleName !== 'Staff') {
        const isValid = await this.$validator.validateAll()
        if (isValid) {
          let res = await this.addNewCate({
            label: this.cateName,
            dataTypeId: this.typeId
          })
          if (res) {
            this.makeToast({
              title: 'Create a Category is successful!!!',
              variant: 'success'
            })
            this.$emit('retrieveCate')
            this.$bvModal.hide('modalAddCate')
          } else {
            this.makeToast({
              title: 'Create a Category is failed!',
              variant: 'danger'
            })
          }
        }
        this.resetForm()
      }
    },
    handleCancelClick () {
      this.resetForm()
      this.$bvModal.hide('modalAddCate')
    }
  }
}
</script>

<style>

</style>
