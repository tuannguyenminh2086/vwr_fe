<template>
  <b-modal id="modalUpdateType" title="Add new Category" modal-class="vw-modal" centered>
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">{{title}}</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group
          class="vw-form__group"
          label="Category name" label-class="vw-form__label"
          label-for="influencer-url">
          <b-form-input
            class="vw-form__control"
            placeholder="Enter name"
            trim
            name="cate_name"
            v-validate="{ required: true }"
            v-model="cateName"
            id="cateName">
          </b-form-input>
        </b-form-group>
      </div>
    </template>
    <template slot="modal-footer">
      <b-button :class="inviteButtonClass" @click="handleSaveClick">
        <b-spinner small v-if="isSending"></b-spinner>
        <span v-else>Change</span>
      </b-button>
      <b-button class="vw-button vw-button--dark" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'updateCate',
  data () {
    return {
      isSending: false,
      cateName: ''
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  watch: {
    item (val, oldval) {
      this.cateName = val.label
    }
  },
  computed: {
    inviteButtonClass () {
      let res = 'vw-button vw-button--primary'
      res += this.isSending ? ' vw-button--disabled' : ''
      return res
    },
    title () {
      return 'Current name: ' + this.item.label
    }
  },
  methods: {
    ...mapActions({
      addNewCate: 'dataHub/updateAType'
    }),
    resetForm () {
      this.cateName = ''
      this.isSending = false
    },
    handleSaveClick () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isSending = true
          this.updateAType(this.cateName)
        }
      })
    },
    handleCancelClick () {
      this.resetForm()
      this.$bvModal.hide('modalUpdateType')
    }
  }
}
</script>

<style>

</style>
