<template>
  <div>
  <b-modal id="modalChangePassword" title="Change password" modal-class="vw-modal" centered no-stacking>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Change password</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="Current password"
          label-class="vw-form__label"
          label-for="cur_pwd"
          :state="!errors.has('current password')"
          :invalid-feedback="errors.first('current password')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter your current password"
            type="password"
            autofocus
            name="current password"
            v-validate.disable="{ required: true }"
            v-model.trim="cur_pwd"
            id="cur_pwd">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('current password') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="New password"
          label-class="vw-form__label"
          label-for="new_pwd"
          :state="!errors.has('new password')"
          :invalid-feedback="errors.first('new password')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter new password"
            type="password"
            name="new password"
            v-validate.disable="{ required: true }"
            v-model.trim="new_pwd"
            id="now_pwd">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('new password') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="Confirm new password"
          label-class="vw-form__label"
          label-for="cfm_pwd"
          :state="!errors.has('confirm password')"
          :invalid-feedback="errors.first('confirm password')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter new password again"
            type="password"
            name="new password"
            v-validate.disable="{ required: true, confirmed:new_pwd }"
            v-model.trim="cfm_pwd"
            id="cfm_pwd">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('new password') }}
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
      <b-link class="float-left" v-b-modal.modalForgotPassword>Forgot password?</b-link>
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
  name: 'modalChangePassword',
  props: {
    userData: {
      type: Object,
      defautl: () => {}
    }
  },
  data () {
    return {
      cur_pwd: '',
      new_pwd: '',
      cfm_pwd: '',
      isSending: false,
      error: {
        status: ''
      }
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
        let payload = Object.assign(this.userData, { password: this.new_pwd })
        // console.log(payload)
        let resp = await this.updateUserById(payload)
        if (resp) {
          if (resp.status === 200) {
            this.makeToast({
              title: 'Update successful!!!',
              variant: 'success'
            })
            this.$bvModal.hide('modalChangePassword')
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
      this.cur_pwd = ''
      this.new_pwd = ''
      this.cfm_pwd = ''
      this.isSending = false
    },
    handleCancelClick () {
      this.$bvModal.hide('modalChangePassword')
    }
  }
}
</script>
<style lang="scss">
  #modalChangePassword{
    .float-left { margin-right: 7rem}
  }
</style>
