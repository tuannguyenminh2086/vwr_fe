<template>
  <div class="vw-info__bank-info">
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <p class="vw-info__section-title">
        Bank Account
      </p>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group
        class="vw-form__group"
        label="Account owner"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter name"
          :value="data.bank.accountOwner"
          trim
          @input="handleAccountOwnerChange"
          ></b-form-input>
      </b-form-group>
      <b-form-group
        class="vw-form__group"
        label="Account number"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter number"
          :value="data.bank.bankNumber"
          type="number"
          trim
          @input="handleAccountNumberChange"
          ></b-form-input>
      </b-form-group>
      <b-form-group
        class="vw-form__group"
        label="Bank"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter bank name"
          :value="data.bank.bankName"
          trim
          @input="handleAccountBankChange"
          ></b-form-input>
      </b-form-group>
      <b-form-group
        class="vw-form__group"
        label="Branch"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter branch name"
          :value="data.bank.bankBranch"
          trim
          @input="handleAccountBranchChange"
          ></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import {
  UPDATE_ACCOUNT_OWNER,
  UPDATE_ACCOUNT_NUMBER,
  UPDATE_ACCOUNT_BANK,
  UPDATE_ACCOUNT_BRANCH
} from '@/eventBus-types'
export default {
  name: 'BankInfo',

  data () {
    return {}
  },
  props: {
    data: Object
  },
  methods: {
    handleAccountOwnerChange (value) {
      this.$geb.emit({ id: UPDATE_ACCOUNT_OWNER, data: value })
    },

    handleAccountNumberChange (value) {
      this.$geb.emit({ id: UPDATE_ACCOUNT_NUMBER, data: value })
    },

    handleAccountBankChange (value) {
      this.$geb.emit({ id: UPDATE_ACCOUNT_BANK, data: value })
    },

    handleAccountBranchChange (value) {
      this.$geb.emit({ id: UPDATE_ACCOUNT_BRANCH, data: value })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';
.vw-info {
  &__section-title {
    margin-top: 2.5rem;
    color: $color-form-title;
  }
  &__form {
    &-bottom-row {
      justify-content: flex-end;
    }
    &-col {
      padding-bottom: 0;
      @media screen and (width: 768px) {
        flex: 0 0 50%;
        max-width: 50%;
      }
      &--align-right {
        display: flex;
        justify-content: flex-end;
      }
    }
    &-issue-image {
      border: 1px solid $color-app-bg;
      padding: 5px;
    }
  }
}
</style>
