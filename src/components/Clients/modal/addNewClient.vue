<template>
<div>
  <b-modal id="modalAddClient" title="Add new client" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Add new client</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="Client name"
          label-class="vw-form__label"
          label-for="input_client_name"
          :state="!errors.has('Name')"
          :invalid-feedback="errors.first('Name')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Enter name"
            trim
            type="text"
            autofocus
            name="Name"
            v-validate.disable="{ required: true }"
            v-model="client.name"
            id="input_client_name">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('Name') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          class="vw-form__group has_append"
          label="Client’s ID" label-class="vw-form__label"
          :state="!errors.has('clientID')"
          :invalid-feedback="errors.first('clientID')"
          label-for="input_client_id">
          <b-form-input
            class="vw-form__control"
            placeholder="Auto generate"
            trim
            type="text"
            :readonly="!editable"
            name="clientID"
            v-validate.disable="{ required: true }"
            v-model="client.client_id"
            id="input_client_id">
          </b-form-input>
          <b-input-group-append>
            <b-button variant="link" @click="editable = !editable">Edit</b-button>
          </b-input-group-append>
          <b-form-invalid-feedback>
            {{ errors.first('clientID') }}
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
        <span v-else>Create</span>
      </b-button>
      <b-button class="vw-button vw-button--dark" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import {
  MAKE_TOAST
} from '@/store/action-types'
import { env } from '@/config'
import { mapActions } from 'vuex'

export default {
  name: 'modalAddClient',
  data () {
    return {
      isSending: false,
      client: {
        name: '',
        client_id: ''
      },
      editable: false,
      error: {
        status: ''
      },
      post: null
    }
  },
  computed: {
    inviteButtonClass () {
      let res = 'vw-button vw-button--primary'
      res += this.isSending ? ' vw-button--disabled' : ''
      return res
    }
  },
  methods: {
    ...mapActions({
      createClient: 'clients/create',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    generateCID (length) {
      let result = ''
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      this.client.client_id = result
    },
    resetForm () {
      this.client.name = ''
      this.client.client_id = ''
      this.isSending = false
    },
    resetErrors () {
      this.error.success = true
      this.error.status = ''
      this.errors.clear()
    },
    async handleSaveClick () {
      const result = await this.$validator.validateAll()
      if (result && this.$user.get().role === env.USER_ROLE_SUPER_ADMIN) {
        this.isSending = true
        try {
          await this.createClient(this.client)
          this.makeToast({
            title: 'Create Client is successful!',
            variant: 'success'
          })
        } catch (err) {
          this.makeToast({
            title: 'Create Client is failed!',
            variant: 'danger'
          })
        } finally {
          this.handleCancelClick()
        }
      }
    },
    handleCancelClick () {
      this.resetForm()
      this.$bvModal.hide('modalAddClient')
    }
  },
  mounted () {
    this.generateCID(5)
  }
}
</script>

<style lang="scss">
  .vw-form__group.has_append {
    > div {
      position: relative;
    }
    .input-group-append {
      position: absolute;
      z-index: 1;
      right: 7px;
      bottom: 5px;
    }
  }
</style>
