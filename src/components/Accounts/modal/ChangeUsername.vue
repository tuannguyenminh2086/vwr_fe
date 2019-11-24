<template>
  <div>
  <b-modal id="modalChangeUsername" title="Change user name" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Change user name</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="New user name"
          label-class="vw-form__label"
          label-for="username"
          :state="!errors.has('username')"
          :invalid-feedback="errors.first('username')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter your new user name"
            trim
            type="text"
            autofocus
            name="username"
            v-validate.disable="{ required: true, alpha_dash: true }"
            v-model="username"
            id="username">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('username') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <div v-if="error.status">
          <small class="text-danger">
           {{error.status}}
          </small>
        </div>
      </div>
    </template>
    <template slot="modal-footer">
      <b-button :class="inviteButtonClass" @click="handleSaveClick">
        <b-spinner small v-if="isSending"></b-spinner>
        <span v-else>Change</span>
      </b-button>
      <b-button class="vw-button vw-button--outline-secondary" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  MAKE_TOAST
} from '@/store/action-types'

export default {
  name: 'modalChangeUsername',
  data () {
    return {
      username: '',
      isSending: false,
      error: {
        status: ''
      }
    }
  },
  props: {
    userData: {
      type: Object,
      defautl: () => {}
    }
  },
  computed: {
    ...mapState({
      roleName: state => state.user.currentUser.roleName
    }),
    inviteButtonClass () {
      let res = 'vw-button vw-button--primary'
      res += this.isSending ? ' vw-button--disabled' : ''
      return res
    }
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      updateUserById: 'user/updateUserById'
    }),
    async handleSaveClick () {
      const isValid = await this.$validator.validateAll()
      if (isValid && !this.isSending) {
        this.isSending = true
        this.userData.fullName = this.username
        let resp = await this.updateUserById(this.userData)
        if (resp) {
          if (resp.status === 200) {
            this.makeToast({
              title: 'Update successful!!!',
              variant: 'success'
            })
            this.$bvModal.hide('modalChangeUsername')
          } else {
            this.makeToast({
              title: 'Have a problems',
              variant: 'danger'
            })
          }
        }
        this.resetForm()
      }
    },
    resetForm () {
      this.username = ''
      this.isSending = false
    },
    handleCancelClick () {
      this.resetForm()
      this.$bvModal.hide('modalChangeUsername')
    }
  }
}
</script>

<style>

</style>
