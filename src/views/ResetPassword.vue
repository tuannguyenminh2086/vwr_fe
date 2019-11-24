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
                id="fieldset-password"
                label="Your New Password"
                label-for="input-pwd"
                :state="!errors.has('password')"
                :invalid-feedback="errors.first('password')"
              >
                <b-form-input
                  placeholder="Enter new password"
                  id="input-pwd"
                  name="password"
                  v-model="email"
                  type="password"
                  v-validate="'required|min:6'"
                >
                <b-form-invalid-feedback>
                  {{ errors.first('password') }}
                </b-form-invalid-feedback>
                </b-form-input>
              </b-form-group>
              <b-form-group
                id="fieldset-cpassword"
                label="Confirm your new password"
                label-for="input-cpwd"
                :state="!errors.has('confirm password')"
                :invalid-feedback="errors.first('confirm password')"
              >
                <b-form-input
                  placeholder="Enter your new password again"
                  id="input-cpwd"
                  name="confirm password"
                  type="password"
                  v-validate="'required|min:6'"
                >
                <b-form-invalid-feedback>
                  {{ errors.first('confirm password') }}
                </b-form-invalid-feedback>
                </b-form-input>
              </b-form-group>
              <div class="vw-login__login-button">
                <button
                  type="button"
                  class="btn btn-primary btn-md vw-login__btn-custom"
                  @click="submitSendRequest"
                >
                  <b-spinner small v-if="loading"></b-spinner>
                  Submit
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
      password: ''
    }
  },
  methods: {
    ...mapActions({
      resetUserPwd: 'auth/resetUserPwd'
    }),
    async submitSendRequest () {
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        let payload = {
          email: this.email,
          business_id: this.companyid
        }
        if (this.loading) return
        const resp = await this.resetUserPwd(payload)
        if (resp && !resp.success) {
          this.makeToast({
            title: resp.errorMessage,
            variant: 'danger'
          })
        } else {
          this.makeToast({
            title: 'You can login now with new password.',
            variant: 'success'
          })
          this.$router.push('/login')
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
