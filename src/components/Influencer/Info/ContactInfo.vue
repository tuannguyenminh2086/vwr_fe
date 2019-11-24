<template>
  <div class="vw-info__contact-info">
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <p class="vw-info__section-title">
        02. Contact infomation
      </p>
    </div>
    <b-row class="vw-info__form-row">
      <b-col class="vw-info__form-col">
        <b-form-checkbox
          :checked="this.data.contact.isManager"
          @input="handleIsManagerChange"
          class="checkbox__option-inner"
        >
          Manager's contact
        </b-form-checkbox>
      </b-col>
    </b-row>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group
        class="vw-form__group"
        label="Contact person"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter name"
          :value="this.data.contact.fullName"
          trim
          @input="handleContactFullnameChange"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="vw-form__group"
        label="Phone number"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter phone number"
          :value="this.data.contact.phoneNumber"
          type="tel"
          trim
          @input="handleContactPhoneNumberChange"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="vw-form__group"
        label="Email"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter email"
          :value="this.data.contact.email"
          type="email"
          trim
          @input="handleContactEmail"
        ></b-form-input>
      </b-form-group>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <span class="vw-info__sub-title">Emergency contact</span>
    </div>
    <div class="vw-form__row vw-form__row--1-1-1-1">
      <b-form-group
        class="vw-form__group"
        label="Contact person"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter name"
          :value="this.data.emergencyContact.fullName"
          trim
          @input="handleEmergencyContactFullNameChange"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="vw-form__group"
        label="Relationship with influencer"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter relationship"
          :value="this.data.emergencyContact.relationship"
          trim
          @input="handleEmergencyContactRelationshipChange"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="vw-form__group"
        label="Phone number"
        label-class="vw-form__label"
      >
        <b-form-input
          class="vw-form__control"
          placeholder="Enter phone number"
          :value="this.data.emergencyContact.phoneNumber"
          type="tel"
          trim
          @input="handleEmergencyContactPhoneNumberChange"
          ></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>
<script>
import {
  UPDATE_IS_MANAGER_CONTACT,
  UPDATE_CONTACT_FULLNAME,
  UPDATE_CONTACT_PHONE_NUMBER,
  UPDATE_CONTACT_EMAIL,
  UPDATE_EMERGENCY_CONTACT_FULLNAME,
  UPDATE_EMERGENCY_CONTACT_RELATIONSHIP,
  UPDATE_EMERGENCY_CONTACT_PHONE_NUMBER
} from '@/eventBus-types'
export default {
  name: 'influencer-contact-info',
  props: {
    data: Object
  },
  methods: {
    handleIsManagerChange (value) {
      this.$geb.emit({ id: UPDATE_IS_MANAGER_CONTACT, data: value })
    },
    handleContactFullnameChange (value) {
      this.$geb.emit({ id: UPDATE_CONTACT_FULLNAME, data: value })
    },
    handleContactPhoneNumberChange (value) {
      this.$geb.emit({ id: UPDATE_CONTACT_PHONE_NUMBER, data: value })
    },
    handleContactEmail (value) {
      this.$geb.emit({ id: UPDATE_CONTACT_EMAIL, data: value })
    },
    handleEmergencyContactFullNameChange (value) {
      this.$geb.emit({ id: UPDATE_EMERGENCY_CONTACT_FULLNAME, data: value })
    },
    handleEmergencyContactRelationshipChange (value) {
      this.$geb.emit({ id: UPDATE_EMERGENCY_CONTACT_RELATIONSHIP, data: value })
    },
    handleEmergencyContactPhoneNumberChange (value) {
      this.$geb.emit({ id: UPDATE_EMERGENCY_CONTACT_PHONE_NUMBER, data: value })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';
@import './../../../assets/scss/base/mixins';
.vw-info {
  &__section-title {
    margin-top: 1rem;
    color: $color-form-title;
    line-height: 1.5rem;
  }
  &__sub-title {
    display: inline-block;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
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
  }
}
/deep/ input:placeholder-shown {
  color: #6c757d;
}
/deep/ .checkbox {
  &__option-inner {
    margin-top: 0.25rem;
    margin-bottom: 1.5rem;
    &.custom-checkbox .custom-control-input ~ .custom-control-label:before {
      border-color: $color-text;
      top: 0.19rem;
    }
    &.custom-checkbox .custom-control-input:checked ~ .custom-control-label:before {
      border-color: $color-text;
      top: 0.19rem;
    }
    &.custom-checkbox .custom-control-input:checked ~ .custom-control-label:after {
      @include checkIcon($color-text);
    }
  }
}
</style>
