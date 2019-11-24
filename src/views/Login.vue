<template>
  <div class="vw-login">
    <div class="d-flex justify-content-center align-items-center current-color" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="vw-login__wrapper" v-else>
      <div class="vw-login__branding">
        <LogoIcon color="currentColor" :width="70" :height="65" />
        <Logo color="currentColor" :width="150" :height="35" font-size="1rem" />
      </div>
      <b-container>
        <b-row align-h="center">
          <b-col cols="10" sm="8" md="5">
            <div class="vw-login__form">
              <b-form-group id="fieldset-company-id" label="Your Company ID" label-for="input-company-id">
                <b-form-input placeholder="Enter ID" id="input-company-id" v-model="companyid" trim @keyup.enter="submitLogin"></b-form-input>
              </b-form-group>
              <b-form-group id="fieldset-email" label="Your Email" label-for="input-email" :invalid-feedback="invalidFeedbackEmail">
                <b-form-input placeholder="Enter email" id="input-email" v-model="email" type="email" @blur="isEmailDirty=true" trim :state="emailState" @keyup.enter="submitLogin">
                </b-form-input>
              </b-form-group>
              <b-form-group id="fieldset-password" label="Your password" label-for="input-password" :invalid-feedback="invalidFeedbackPassword">
                <b-form-input placeholder="Enter password" id="input-password" v-model="password" type="password" @blur="isPasswordDirty=true" trim :state="passwordState" @keyup.enter="submitLogin">
                </b-form-input>
              </b-form-group>
              <div class="vw-login__remember-row">
                <b-form-checkbox id="checkbox-is-remember-me" v-model="isRememberMe" name="checkbox-is-remember-me" value="true" unchecked-value="false">Remember me</b-form-checkbox>
                <router-link to="forgot-password">Forgot password?</router-link>
              </div>
              <div class="vw-login__login-button">
                <button type="button" class="btn btn-primary btn-md vw-login__btn-custom" @click="submitLogin">Login</button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {
  MAKE_TOAST
} from '@/store/action-types'
import { regExp } from '@/variables'

export default {
  name: 'login',
  components: {
    Logo: () => import('@/components/Logo/Logo.vue'),
    LogoIcon: () => import('@/components/Logo/LogoIcon.vue')
  },
  data () {
    return {
      companyid: '',
      email: '',
      password: '',
      isRememberMe: false,
      isEmailDirty: false,
      isPasswordDirty: false
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.auth.loading
    }),
    emailState () {
      if (this.isEmailDirty) {
        if (!this.email || !regExp.email.test(this.email)) {
          return false
        }
        return true
      }
      return null
    },
    invalidFeedbackEmail () {
      if (!this.email) {
        return 'Please enter your email'
      } else if (!regExp.email.test(this.email)) {
        return 'Please enter a valid email'
      }
      return ''
    },
    passwordState () {
      if (this.isPasswordDirty) {
        return !!this.password
      }
      return null
    },
    invalidFeedbackPassword () {
      return this.password ? '' : 'Please enter your password'
    },
    isFormValid () {
      return (this.emailState && this.passwordState)
    }
  },
  methods: {
    ...mapActions({
      handleLogin: `auth/login`,
      handleLogout: 'auth/logout',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async submitLogin () {
      if (!this.isFormValid) {
        // Validations form
        this.isEmailDirty = true
        this.isPasswordDirty = true
      } else {
        try {
          let { email, password, isRememberMe, companyid } = this
          const resp = await this.handleLogin({ email, password, isRememberMe, businessId: companyid })
          if (!resp.success) {
            this.makeToast({
              title: resp.errorMessage,
              variant: 'danger'
            })
          } else {
            this.$user.set({ role: resp.roleResp })
            // Navigate to Home
            switch (resp.roleResp) {
              case 'Super Admin':
                this.$router.push('/influencers')
                break
              case 'Admin':
              case 'Staff':
                this.$router.push('/network')
                break
            }
          }
        } catch (error) {
          // Wrong username or password
          console.log(error)
        }
      }
    },
    async doLogout () {
      await this.handleLogout()
      this.$user.set({ role: 'Guest' })
    }
  },
  mounted () {
    this.doLogout()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base/variables';
  .vw-login {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background-color: $color-white;
    background-image: url('../assets/images/login_bg.png');
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 15rem;
      margin: 5rem auto;
    }
    &__branding {
      display: flex;
      color: $color-main;
      margin-bottom: 3rem;
      margin-top: 3rem;
    }
    &__remember-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    &__login-button {
      text-align: left;
    }
    &__btn-custom {
      padding: 0.3125rem 2.1875rem;
    }
  }
</style>
