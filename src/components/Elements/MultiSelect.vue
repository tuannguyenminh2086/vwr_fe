<template>
  <div :class="multiSelectClass">
    <multiselect
      :id="inputId"
      :value="value"
      :options="options"
      :placeholder="placeholder"
      :multiple="configs.multiple"
      :label="configs.label"
      :trackBy="configs.trackBy"
      :showLabels="configs.showLabels"
      :limit="configs.limit"
      :searchable="configs.searchable"
      :disabled="configs.disabled"
      :optionHeight="configs.optionHeight"
      :maxHeight="configs.maxHeight"
      :closeOnSelect="closeOnSelect"
      :selectLabel="configs.selectLabel"
      :selectGroupLabel="configs.selectGroupLabel"
      :selectedLabel="configs.selectedLabel"
      :deselectLabel="configs.deselectLabel"
      :deselectGroupLabel="configs.deselectGroupLabel"
      :loading="configs.loading"
      @input="handleInput">
      <template slot="tag" slot-scope="props">
        <span class="multiselect__tag-label">{{ props.option[configs.label] }}</span>
      </template>
      <template slot="option" v-if="configs.multiple" slot-scope="props">
        <b-form-checkbox disabled class="multiselect__option-inner">{{ props.option[configs.label] }}</b-form-checkbox>
      </template>
      <!-- <template slot="afterList" v-if="configs.multiple">
        <span class="multiselect__counter">Selected: {{ selectedOptions | addZero }}</span>
      </template> -->
    </multiselect>
  </div>
</template>

<script>
export default {
  name: 'vw-multiselect',
  props: {
    // Configs
    configs: Object,
    inputId: String,
    // Data
    placeholder: String,
    value: [String, Object, Array, Number],
    state: {
      type: Boolean,
      default: null
    },
    options: Array,
    customValue: String
  },
  components: {
    Multiselect: () => import('vue-multiselect')
  },
  data () {
    return {
    }
  },
  computed: {
    // computedValue () {
    //   return this.value.map()
    // },
    multiSelectClass () {
      return {
        'vw-multiselect': true,
        'vw-multiselect--valid': this.state === true,
        'vw-multiselect--invalid': this.state === false
      }
    },
    closeOnSelect () {
      if (this.configs.closeOnSelect) {
        return this.configs.closeOnSelect
      }
      return !this.configs.multiple
    },
    selectedOptions () {
      return Array.isArray(this.value) ? this.value.length : 0
    }
  },
  methods: {
    handleInput (value) {
      if (this.customValue && (value.length)) {
        if (value && value.length > 0) {
          value = value.map(item => item[this.customValue])
        }
      } else if (this.customValue && (typeof (value) === 'object')) {
        value = value[this.customValue]
      }
      this.$emit('onInput', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';
@import './../../assets/scss/base/mixins';

.vw-multiselect {
  /deep/ .multiselect {
    font-size: 0.8125rem;
    &--disabled {
      opacity: 1;
      background-color: transparent;
      .multiselect {
        &__tags {
          background-color: #e9ecef;
        }
        &__select {
          background-color: transparent;
        }
        &__single {
          background-color: transparent;
        }
      }
    }
    &__content {
      &-wrapper {
        border: 0;
        border-radius: 0.25rem;
        box-shadow: 0 0 0.375rem rgba(0, 0, 0, 0.1);
      }
    }
    &__tags {
      min-height: 3rem;
      font-size: 0.8125rem;
      padding: 0.5rem 2.5rem 0 1rem;
      border-color: $color-border;
      &-wrap {
        line-height: 2rem;
      }
    }
    &__strong {
      margin-bottom: 0;
      font-weight: 400;
      line-height: 2rem;
    }
    &__placeholder {
      min-height: 2rem;
      line-height: 2rem;
      margin-bottom: 0;
      padding-top: 0;
      padding-left: 0;
      color: $color-controltext;
    }
    &__spinner {
      height: auto;
      top: 1rem;
      right: 0.875rem;
      width: 1rem;
      height: 1rem;
      border: 0.2rem solid $color-main;
      border-right: 0.2rem solid transparent;
      border-radius: 50%;
      animation: spinner-border 0.75s linear infinite;
      &:before,
      &:after {
        content: none;
      }
    }
    &__input,
    &__single {
      font-size: 0.8125rem;
      min-height: 2rem;
      line-height: 2rem;
      margin-bottom: 0;
      padding-left: 0;
    }
    &__select {
      height: 3rem;
      top: 0;
      right: 0;
    }
    &__tag {
      padding: 0;
      border-radius: 0;
      color: $color-text;
      background-color: transparent;
      &-icon {
        display: none;
      }
      &-label {
        &:not(:last-child) {
          &:after {
            content: ', '
          }
        }
      }
    }
    &__option {
      color: $color-subtext;
      font-size: 0.875rem;
      line-height: 1.5rem;
      font-weight: 500;
      cursor: pointer;
      user-select: none;
      padding: 0.5rem 1.25rem;
      transition: all 0.3s ease;
      .custom-control-label:before {
        background-color: transparent;
      }
      &-inner {
        display: flex;
      }
      &--selected {
        background-color: $color-app-bg;
        .custom-control-label:before {
          border-color: $color-text;
        }
        .custom-control-label:after {
          @include checkIcon($color-text);
        }
        .custom-control-input:disabled ~ .custom-control-label {
          color: $color-text;
        }
      }
      &--highlight {
        background-color: rgba(56, 120, 243, 0.1);
        .custom-control-label:before {
          border-color: $color-main;
        }
        .custom-control-input:disabled ~ .custom-control-label {
          color: $color-main;
        }
        &.multiselect__option--selected {
          .custom-control-label:after {
            @include checkIcon($color-main);
          }
        }
      }
    }
    &__counter {
      display: block;
      font-size: 0.6875rem;
      line-height: 1.82;
      padding: 0.5rem 1rem;
      color: $color-subtext;
    }
  }
  &--invalid {
    /deep/ .multiselect {
      &__tags {
        border-color: $color-form-invalid;
      }
    }
  }
  &--valid {
    /deep/ .multiselect {
      &__tags {
        border-color: $color-form-valid;
      }
    }
  }
}
</style>
