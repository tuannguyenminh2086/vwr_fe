<template>
<div>
  <b-modal id="modalAddlink" title="Add link" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Add link</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="Link"
          label-class="vw-form__label"
          label-for="inf_post_link"
          :state="!errors.has('link')"
          :invalid-feedback="errors.first('link')"
          >
          <b-form-input
            class="vw-form__control"
            placeholder="Paste link here"
            trim
            type="url"
            autofocus
            name="link"
            v-validate.disable="{ required: true, url: {require_protocol: true }}"
            v-model="link"
            id="inf_post_link">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('link') }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          class="vw-form__group"
          label="Actual Cost" label-class="vw-form__label"
          :state="!errors.has('cost')"
          :invalid-feedback="errors.first('cost')"
          label-for="inf_cost">
          <b-form-input
            class="vw-form__control"
            placeholder="Enter cost"
            trim
            type="number"
            name="cost"
            v-validate.disable="{ required: true, min_value: 0}"
            v-model="cost"
            id="inf_cost">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors.first('cost') }}
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
      <b-button class="vw-button vw-button--dark" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { isNil } from 'lodash'
export default {
  name: 'modalAddlink',
  data () {
    return {
      isSending: false,
      link: '',
      cost: 0,
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
      _getPostData: 'reports/getPostData'
    }),
    resetForm () {
      this.link = ''
      this.cost = 0
    },
    resetErrors () {
      this.error.success = true
      this.error.status = ''
      this.errors.clear()
    },
    async handleSaveClick () {
      this.resetErrors()
      const result = await this.$validator.validateAll()
      if (result) {
        let { link, cost } = this
        this.isSending = true
        try {
          let response = await this._getPostData(link)
          let { data: { data }, status } = response
          if (status === 200) {
            if (!isNil(data) && !isNil(data.influencer)) {
              this.$emit('addPostHandle', Object.assign({ actualCost: cost }, data))
            } else {
              this.error.status = `Can't get data. Please try another post link!`
            }
          } else {
            this.error.status = 'Can\'t get data. Please try another post link!'
          }
        } catch (e) {
          console.log('Unexpected error occurred')
        } finally {
          // Deactive Indicator
          this.isSending = false
          this.resetForm()
        }
      }
    },
    handleCancelClick () {
      this.resetForm()
      this.$bvModal.hide('modalAddlink')
    }
  }
}
</script>

<style>

</style>
