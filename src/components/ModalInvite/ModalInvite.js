import { regExp } from '@/variables'
import { mapActions } from 'vuex'
import {
  MAKE_TOAST,
  INVITE_INFLUENCER
} from '@/store/action-types'

export default {
  name: 'invite-form',
  data () {
    return {
      // Indicator
      isSending: false,
      // Form data
      influencerUrl: '',
      influencerEmail: '',
      // Form dirty
      isInfluencerUrlDirty: false,
      isInfluencerEmailDirty: false
    }
  },
  computed: {
    inviteButtonClass () {
      return {
        'vw-button vw-button--primary': true,
        'vw-button--disabled': this.isSending
      }
    },
    influencerUrlState () {
      if (this.isInfluencerUrlDirty) {
        if (!this.influencerUrl || !regExp.url.test(this.influencerUrl)) {
          return false
        }
        return true
      }
      return null
    },
    influencerUrlFeedback () {
      if (!this.influencerUrl) {
        return 'Please enter url'
      }
      if (!regExp.url.test(this.influencerUrl)) {
        return 'Please enter a valid url'
      }
      return ''
    },
    influencerEmailState () {
      if (this.isInfluencerEmailDirty) {
        if (!this.influencerEmail || !regExp.email.test(this.influencerEmail)) {
          return false
        }
        return true
      }
      return null
    },
    influencerEmailFeedback () {
      if (!this.influencerEmail) {
        return 'Please enter email'
      }
      if (!regExp.email.test(this.influencerEmail)) {
        return 'Please enter a valid email'
      }
      return ''
    },
    isFormValid () {
      return this.influencerUrlState && this.influencerEmailState
    }
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      _inviteInfluencer: `influencer/${INVITE_INFLUENCER}`
    }),
    async handleSubmit () {
      if (!this.isFormValid) {
        // Validation form
        this.isInfluencerUrlDirty = true
        this.isInfluencerEmailDirty = true
      } else {
        try {
          // Active indicator
          this.isSending = true
          // Post API
          let response = await this._inviteInfluencer({
            email: this.influencerEmail,
            social: this.influencerUrl
          })

          if (response.data && response.data.success) {
            // Show message
            this.makeToast({
              title: 'Invited',
              variant: 'success'
            })
            // Reset form
            this._resetForm()
            // Hide modal
            this.$refs['modal-invite'].hide()
          } else {
            // Show error
            this.makeToast({
              title: response.data.errorDetail,
              variant: 'danger'
            })
          }
        } catch (error) {
          // eslint-disable-console
          console.log('Invite Influencer error:', error)
          // Show error
          this.makeToast({
            title: 'Can not invite, please try again.',
            variant: 'danger'
          })
        } finally {
          // Deactive indicator
          this.isSending = false
        }
      }
    },
    handleCancelClick () {
      // Reset form
      this._resetForm()
      // Hide modal
      this.$refs['modal-invite'].hide()
    },
    _resetForm () {
      this.influencerUrl = ''
      this.influencerEmail = ''
      this.isInfluencerUrlDirty = false
      this.isInfluencerEmailDirty = false
    }
  }
}
