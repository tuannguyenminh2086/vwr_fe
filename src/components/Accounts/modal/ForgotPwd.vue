<template>
  <div>
  <b-modal id="modalForgotPassword" title="Forgot password" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Forgot password</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="Your email"
          label-class="vw-form__label"
          label-for="email"
          :state="!errors.has('email')"
          :invalid-feedback="errors.first('email')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter email"
            trim
            type="email"
            autofocus
            name="email"
            v-validate.disable="{ required: true, email }"
            v-model.trim="email"
            id="email">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('email') }}
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
        <span v-else>Send</span>
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
  name: 'modalForgotPassword',
  data () {
    return {
      email: '',
      isSending: false,
      error: {
        status: ''
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser
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
      requestUserPwd: 'user/requestUserPwd'
    }),
    resetForm () {
      this.email = ''
      this.isSending = false
    },
    async handleSaveClick () {
      const isValid = await this.$validator.validateAll()
      if (isValid && !this.isSending) {
        this.isSending = true
        let payload = Object.assign({}, { email: this.email, business_id: this.currentUser.client.client_id })
        let resp = await this.requestUserPwd(payload)
        if (resp) {
          if (resp.status === 200) {
            this.makeToast({
              title: 'Update successful!!!',
              variant: 'success'
            })
            this.$bvModal.hide('modalForgotPassword')
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
    handleCancelClick () {
      this.$bvModal.hide('modalForgotPassword')
    }
  }
}
</script>

<style>

</style>
