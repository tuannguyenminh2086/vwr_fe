<template>
  <b-row class="vw-info__summary">
    <div class="vw-info__avatar-col">
      <InfluencerAvatar :imgUrl="avatar" imgInfo="Influencer Name" />
    </div>
    <div class="vw-info__general-col">
      <div class="vw-info__general-wrapper">
        <div class="d-flex">
          <div class="vw-info__full-name mr-4">{{fullName}}</div>
          <b-button
            class="vw-button vw-button--success"
            v-b-modal.modalUpdateStatistic
          >
            Update statistics
          </b-button>
        </div>
        <div class="vw-info__audience-number">Audience: {{audience | formatNumber}}</div>
        <div class="vw-info__summary-info">
          <p class="vw-info__description" v-if="!isEditingDescription" @click="isEditingDescription = true">
            {{description || 'No description'}}
          </p>
          <b-form-textarea class="vw-info__description-edit" placeholder="Enter description" trim autofocus v-else :value="description" @input="handleDescriptionChange" @blur="isEditingDescription = false">
          </b-form-textarea>
        </div>
        <b-row class="vw-info__action">
          <!--Social button-->
          <b-col class="vw-info__add-social" lg="3" md="3" sm="6">
            <p class="vw-info__action-title">Add more Social Platform:</p>
            <span class="vw-info__social-buttons">
              <button class="vw-info__social-button vw-info__social-button--disable" v-if="socials.some(social => social.platform === 'Facebook')">
                <Icon class="vw-info__social-button-icon" name="facebook-circle-disable" />
              </button>
              <button class="vw-info__social-button" v-b-modal.modal-invite v-else>
                <Icon class="vw-info__social-button-icon" name="facebook-circle" />
              </button>
              <button class="vw-info__social-button vw-info__social-button--disable" v-if="socials.some(social => social.platform === 'YouTube')">
                <Icon class="vw-info__social-button-icon" name="youtube-circle-disable" />
              </button>
              <button class="vw-info__social-button" v-b-modal.modal-invite v-else>
                <Icon class="vw-info__social-button-icon" name="youtube-circle" />
              </button>
              <button class="vw-info__social-button vw-info__social-button--disable" v-if="socials.some(social => social.platform === 'Instagram')">
                <Icon class="vw-info__social-button-icon" name="instagram-circle-disable" />
              </button>
              <button class="vw-info__social-button" v-b-modal.modal-invite v-else>
                <Icon class="vw-info__social-button-icon" name="instagram-circle" />
              </button>
            </span>
          </b-col>
          <!--Status actions-->
          <b-col class="vw-info__status" lg="3" md="3" sm="6">
            <p class="vw-info__action-title">Status:</p>
            <b-dropdown text="Pending"
              class="vw-info__status-dropdown"
              variant="outline-warning"
              size="sm"
              right
              menu-class="vw-info__status__menu-class"
              v-if="data.status === 0 || !data.status">
              <b-dropdown-item @click="updateInfluencerStatus(1)" href="#">Completed</b-dropdown-item>
            </b-dropdown>
            <b-dropdown text="Completed"
              class="vw-info__status-dropdown"
              variant="outline-success"
              size="sm"
              right
              menu-class="vw-info__status__menu-class"
              v-else-if="data.status === 1">
              <b-dropdown-item @click="updateInfluencerStatus(0)" href="#">Pending</b-dropdown-item>
            </b-dropdown>
            <b-dropdown text="Deleted"
              class="vw-info__status-dropdown"
              variant="outline-secondary"
              size="sm"
              right
              disabled
              menu-class="vw-info__status__menu-class"
              v-else-if="status === 2">
            </b-dropdown>
          </b-col>
        </b-row>
      </div>
    </div>
    <!-- modal-->
    <ModalUpdateInfo :influencerData="data" :avatar="avatar" :full-name="data.fullName" :description="data.description" :id="data._id" />
  </b-row>
</template>
<script>
import {
  UPDATE_INFLUENCER_STATUS,
  UPDATE_INFLUENCER_DESCRIPTION
} from '@/eventBus-types.js'

export default {
  name: 'influencer-general-info',
  components: {
    Icon: () => import('@/components/Icon/Icon.vue'),
    ModalUpdateInfo: () => import('../Modal/modalUpdateStatistic.vue'),
    InfluencerAvatar: () => import('@/components/Influencer/Avatar/Avatar.vue')
  },
  props: {
    data: Object
  },
  data () {
    return {
      isEditingDescription: false
    }
  },
  computed: {
    avatar () {
      return this.data.avatar ? this.data.avatar.thumbnailUrl : 'https://via.placeholder.com/128'
    },
    fullName () {
      return this.data.fullName ? this.data.fullName : ''
    },
    audience () {
      return this.data.totalAudience ? this.data.totalAudience : 0
    },
    description () {
      return this.data.description ? this.data.description : ''
    },
    socials () {
      return this.data.socials ? this.data.socials : []
    },
    status () {
      return this.data.status ? this.data.status : 0
    }
  },
  methods: {
    updateInfluencerStatus (value) {
      this.$geb.emit({ id: UPDATE_INFLUENCER_STATUS, data: value })
    },
    handleDescriptionChange (value) {
      this.$geb.emit({ id: UPDATE_INFLUENCER_DESCRIPTION, data: value })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/base/variables';

.vw-info {
  &__general-col {
    margin-left: 1.5rem;
    flex: 1 0 auto;
  }
  &__description {
    cursor: pointer;
    &-edit {
      font-size: 0.8125rem;
    }
  }
  &__full-name {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2rem;
  }
  &__audience-number {
    margin-top: 0.5rem;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
  &__summary {
    display: flex;
    padding: 0 15px;
    &-info {
      margin-top: 1rem;
      font-size: 0.8125rem;
      line-height: 1.25rem;
      color: $color-controltext;
    }
  }
  &__action {
    margin-top: 1.5rem;
    &-title {
      color: #191D28;
      font-size: 0.8125rem;
      line-height: 1.25rem;
      letter-spacing: 0.1px;
    }
  }
  &__add-social {
    @media screen and (max-width: 768px) {
      flex: 0 0 60%;
      max-width: 60%;
    }
  }
  &__social-buttons {
    display: flex;
    margin: 0 -0.5rem
  }
  &__social-button {
    margin: 0 0.2rem;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    border-color: transparent;
    &:hover, &:focus, &:active {
      background-color: transparent;
      border-color: transparent;
      outline: 0;
    }
    &-icon {
      /deep/ svg {
        width: 2rem;
        height: 2rem;
      }
    }
    &--disable {
      color: gray;
      cursor: not-allowed;
    }
  }
  &__status-dropdown {
    /deep/ .btn.dropdown-toggle.btn-sm {
      padding: 0;
      background-color: transparent;
      border: 0;
    }
    /deep/ .btn.dropdown-toggle.btn-outline-warning.btn-sm {
      color: $color-orange;
    }
    /deep/ .btn.dropdown-toggle.btn-outline-warning.btn-sm:hover,
    /deep/ .btn.dropdown-toggle.btn-outline-warning.btn-sm:focus,
    /deep/ .btn.dropdown-toggle.btn-outline-warning.btn-sm:active {
      background-color: transparent;
      border-color: transparent;
      outline: 0;
      color: $color-yellow;
      box-shadow: none;
    }
    /deep/ .btn.dropdown-toggle.btn-sm:after {
      color: $color-subtext;
    }
    /deep/ .btn.dropdown-toggle.btn-outline-success.btn-sm {
      color: $color-success;
    }
    /deep/ .btn.dropdown-toggle.btn-outline-success.btn-sm:hover,
    /deep/ .btn.dropdown-toggle.btn-outline-success.btn-sm:focus,
    /deep/ .btn.dropdown-toggle.btn-outline-success.btn-sm:active {
      background-color: transparent;
      border-color: transparent;
      outline: 0;
      color: $color-success;
      box-shadow: none;
    }
    /deep/ .vw-info__status__menu-class {
      padding: 0.25rem 0;
    }
    /deep/ .dropdown-item:hover {
      background-color: rgba(56, 120, 243, 0.1);
    }
  }
}
</style>
