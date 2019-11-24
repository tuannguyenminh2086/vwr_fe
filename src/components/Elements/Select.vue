<template>
  <div :class="selectClass">
    <v-select
      :inputId="inputId"
      :value="value"
      :options="options"
      :placeholder="placeholder"
      required
      :multiple="multiple"
      :resetOnOptionsChange="resetOnOptionsChange"
      :label="label"
      :reduce="reduce"
      @input="handleInput"
      @search:blur="handleBlur"
      ref="vwSelect"
      v-if="isReady"></v-select>
    <div class="vw-select__loading-wrapper" v-else>
      <input class="vw-select__loading" placeholder="Loading..." />
      <b-spinner small variant="primary" class="vw-select__loading-icon"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vw-select',
  props: {
    value: [Object, Array, String, Number],
    placeholder: String,
    multiple: Boolean,
    resetOnOptionsChange: Boolean,
    options: Array,
    inputId: String,
    label: String,
    reduce: Function,
    isReady: {
      type: Boolean,
      default: true
    },
    state: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      isEmpty: true
    }
  },
  computed: {
    selectClass () {
      return {
        'vw-select': true,
        'vw-select--valid': this.state === true,
        'vw-select--error': this.state === false
      }
    }
  },
  watch: {
    value (v) {
      if ((!v || v.length === 0) && !this.isEmpty) {
        this.$refs.vwSelect.clearSelection()
        this.isEmpty = true
      } else {
        this.isEmpty = false
      }
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('onInput', value)
    },
    handleBlur () {
      this.$emit('onBlur')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-select {
  &--error {
    /deep/ .vs__dropdown-toggle {
      border-color: $color-form-invalid;
    }
  }
  &--valid {
    /deep/ .vs__dropdown-toggle {
      border-color: $color-form-valid;
    }
  }
  &__loading {
    width: 100%;
    font-size: 0.8125rem;
    padding: 0.875rem 1rem;
    border-radius: 0.25rem;
    border: 0.0625rem solid $color-border;
    &-wrapper {
      position: relative;
    }
    &-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }
  /deep/ .vs__dropdown-toggle {
    transition: border-color 0.15s ease-in-out;
  }
}
</style>
