<template>
  <div>
  <b-modal id="modalEditPermissions" title="Edit Permissions" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Edit Permission</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="Email"
          label-class="vw-form__label"
        >
        <b-form-text>duyphuong@gmail.com</b-form-text>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="Permissions"
          label-class="vw-form__label"
        >
        </b-form-group>
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
export default {
  name: 'modalEditPermissions',
  data () {
    return {
      username: '',
      permissionsNew: [],
      isSending: false,
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
    }
  },
  methods: {
    handleSaveClick () {},
    handleCancelClick () {
      this.$bvModal.hide('modalEditPermissions')
    }
  }
}
</script>

<style>

</style>
