<template>
<div>
  <b-modal id="modalAddStaff" title="Add new Staff" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Add new Staff</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          id="label-staff_name"
          label="User name"
          label-for="staff_name"
          label-class="vw-form__label"
          class="vw-form__group"
          :state="!errors.has('name')"
          :invalid-feedback="errors.first('name')"
        >
          <b-form-input
            id="staff_name"
            name="name"
            type="text"
            v-model.trim="name"
            autofocus
            class="vw-form__control"
            v-validate="'required'"
            placeholder="Enter user name"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('name') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="Email"
          label-class="vw-form__label"
          label-for="staff_email"
          :state="!errors.has('email')"
          :invalid-feedback="errors.first('email')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter email"
            trim
            type="email"
            name="email"
            v-validate.disable="{ required: true }"
            v-model="email"
            id="staff_email">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('email') }}
          </b-form-invalid-feedback>
        </b-form-group>
          <b-form-group
              id="label-staff_pwd"
              label="Password"
              label-for="staff_pwd"
              label-class="vw-form__label"
              class="vw-form__group"
              :state="!errors.has('password')"
              :invalid-feedback="errors.first('password')"
            >
              <b-form-input
                id="staff_pwd"
                name="password"
                type="password"
                placeholder="Enter password"
                v-model.trim="pwd"
                class="vw-form__control"
                v-validate="'required'"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors.first('password') }}
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
        <span v-else>Save</span>
      </b-button>
      <b-button class="vw-button vw-button--outline-secondary" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import localforage from '../../../services/storage'
import {
  MAKE_TOAST
} from '@/store/action-types'

export default {
  name: 'modalAddlink',
  data () {
    return {
      isSending: false,
      name: '',
      email: '',
      pwd: '',
      permissions: [],
      error: {
        status: ''
      }
    }
  },
  computed: {
    inviteButtonClass () {
      let res = 'vw-button vw-button--primary'
      res += this.isSending ? ' vw-button--disabled' : ''
      return res
    },
    ...mapState({
      roles: state => state.roles.items,
      croleName: state => state.user.currentUser.roleName
    })
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      createNewStaff: 'clients/createUserForClient',
      fetchAllRoles: 'roles/fetchAllRoles',
      getLoggedUserData: 'user/getLoggedUserData'
    }),
    resetForm () {
      this.name = ''
      this.email = ''
      this.password = ''
    },
    resetErrors () {
      this.error.success = true
      this.error.status = ''
      this.errors.clear()
    },
    async handleSaveClick () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        let clientId = await localforage.getItem('company-id')
        let payload = {
          fullName: this.name,
          email: this.email,
          password: this.pwd,
          roles: []
        }
        payload.roles = this.roles.filter(role => role.name === 'Staff')
        let resp = await this.createNewStaff({ payload, cid: clientId })
        if (resp) {
          this.makeToast({
            title: 'Create a Staff is successful!!!',
            variant: 'success'
          })
          this.$bvModal.hide('modalAddStaff')
        } else {
          this.makeToast({
            title: 'Create a Staff is failed!',
            variant: 'danger'
          })
        }
      }
    },
    handleCancelClick () {
      this.$bvModal.hide('modalAddStaff')
    },
    async fetchdata () {
      await this.getLoggedUserData()
      await this.fetchAllRoles()
    }
  },
  created () {
    this.fetchdata()
  }
}
</script>

<style>

</style>
