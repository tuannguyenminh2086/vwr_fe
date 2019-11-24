<template>
  <div class="vw-campaign__form-footer">
    <template v-if="isCreate">
      <b-button :class="submitButtonClass" @click="handleSubmitClick">
        <b-spinner small v-if="isSending"></b-spinner>
        <span v-else>Create Campaign</span>
      </b-button>
      <b-button class="vw-button vw-button--outline-secondary vw-button--large" @click="handleCancelCreateClick">Cancel</b-button>
    </template>
    <template v-else>
      <b-button class="vw-button vw-button--primary vw-button--large" v-if="!isEditable" @click="handleEnableEdit">Edit</b-button>
      <template v-else>
        <b-button :class="submitButtonClass" @click="handleSubmitClick">
          <b-spinner small v-if="isSending"></b-spinner>
          <span v-else>Save</span>
        </b-button>
        <b-button class="vw-button vw-button--outline-secondary vw-button--large" @click="handleCancelEditClick">Cancel</b-button>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'campaign-detail-form-footer',
  props: {
    isCreate: Boolean,
    isEditable: Boolean,
    isSending: Boolean
  },
  data () {
    return {
    }
  },
  computed: {
    submitButtonClass () {
      return {
        'vw-button vw-button--primary vw-button--large': true,
        'vw-button--disabled': this.isSending
      }
    }
  },
  methods: {
    handleSubmitClick () {
      this.$emit('onSubmit')
    },
    handleCancelCreateClick () {
      this.$emit('onCancelCreate')
    },
    handleEnableEdit () {
      this.$emit('onEnableEdit')
    },
    handleCancelEditClick () {
      this.$emit('onCancelEdit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-campaign {
  &__form {
    &-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
      padding: 2rem 0 1.5rem;
      border-top: 0.0625rem solid $color-border;
    }
  }
}
</style>
