<template>
  <div class="vw-forgot">
    <b-container fluid>
      <b-row align-h="center" align-v="center">
        <b-col cols="3">
          <div class="vw-forgot-form">
            <div class="vw-forgot__branding d-flex justify-content-center">
              <LogoIcon color="currentColor" :width="70" :height="65" />
              <Logo color="currentColor" :width="150" :height="35" font-size="1rem" />
            </div>
            <div class="vw-auth__form">
              <b-form-group
                id="fieldset-company-id"
                label="Your Company ID"
                label-for="input-company-id"
                :state="!errors.has('company id')"
                :invalid-feedback="errors.first('company id')"
                >
                <b-form-input
                  placeholder="Enter ID"
                  id="input-company-id"
                  name="company id"
                  v-model.trim="companyid"
                  v-validate="'required'"
                />
                <b-form-invalid-feedback>
                  {{ errors.first('company id') }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="fieldset-email"
                label="Your Email"
                label-for="input-email"
                :state="!errors.has('email')"
                :invalid-feedback="errors.first('email')"
              >
                <b-form-input
                  placeholder="Enter email"
                  id="input-email"
                  name="email"
                  v-model="email"
                  type="email"
                  v-validate="'required|email'"
                >
                <b-form-invalid-feedback>
                  {{ errors.first('email') }}
                </b-form-invalid-feedback>
                </b-form-input>
              </b-form-group>
              <div class="vw-login__login-button">
                <button
                  type="button"
                  class="btn btn-primary btn-md vw-login__btn-custom btn-block"
                  @click="submitSendRequest"
                >
                  <b-spinner small v-if="loading"></b-spinner>
                  Send password reset link
                </button>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import {
  MAKE_TOAST
} from '@/store/action-types'
export default {
  name: 'forgot',
  components: {
    Logo: () => import('@/components/Logo/Logo.vue'),
    LogoIcon: () => import('@/components/Logo/LogoIcon.vue')
  },
  computed: {
    ...mapState({
      loading: state => state.auth.loading
    })
  },
  data () {
    return {
      companyid: '',
      email: ''
    }
  },
  methods: {
    ...mapActions({
      requestUserPwd: 'auth/requestUserPwd',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async submitSendRequest () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        let payload = {
          email: this.email,
          business_id: this.companyid
        }
        if (this.loading) return
        const { data } = await this.requestUserPwd(payload)
        if (data.success) {
          this.makeToast({
            title: 'Please check your inbox. The mail with reset password link send to you.',
            variant: 'success'
          })
        } else {
          this.makeToast({
            title: data.errorMessage,
            variant: 'danger'
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/base/variables';
.vw-forgot {
  width: 100%;
  height: 100vh;
  background-color: $color-white;
  background-image: url('../assets/images/login_bg.png');
  &-form {
    margin-top: 8rem
  }
  &__branding {
    color: $color-main;
    margin-bottom: 3rem;
    margin-top: 3rem;
    text-align: center
  }
}
</style>
