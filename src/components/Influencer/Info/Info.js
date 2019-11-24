import { mapState, mapActions } from 'vuex'
import {
  GET_INFLUENCER,
  UPDATE_INFLUENCER,
  GET_DATA_HUB,
  // GET_CITY_LIST,
  GET_DISTRICT_LIST,
  GET_WARD_LIST,
  UPDATE_STATUS_INFLUENCER,
  UPDATE_DISTRICT_LIST,
  UPDATE_WARD_LIST,
  MAKE_TOAST
} from '@/store/action-types'
import {
  genderEnum,
  kidsEnum,
  maritalStatusEnum,
  addressTypeEnum
} from '@/variables'
import {
  UPDATE_INFLUENCER_STATUS,
  UPDATE_INFLUENCER_DESCRIPTION,
  UPDATE_STAGE_NAME,
  UPDATE_GENDER,
  UPDATE_DATE_OF_BIRTH,
  UPDATE_OCCUPATION,
  UPDATE_TOPIC_OF_INTEREST,
  UPDATE_LOCATION,
  UPDATE_KID,
  UPDATE_STYLE,
  UPDATE_AWARD,
  UPDATE_BRAND_AMBASSADOR,
  UPDATE_BRAND_HISTORY,
  UPDATE_COUNTRY,
  UPDATE_CITY,
  UPDATE_DISTRICT,
  UPDATE_WARD,
  UPDATE_EXACT_ADDRESS,
  UPDATE_ADDRESS_TYPE,
  UPDATE_MARITAL_STATUS,
  UPDATE_CARD_NUMBER,
  UPDATE_CARD_ISSUE_DATE,
  UPDATE_CARD_ISSUE_PLACE,
  UPDATE_CARD_ISSUE_IMAGES,
  UPDATE_ACCOUNT_OWNER,
  UPDATE_ACCOUNT_NUMBER,
  UPDATE_ACCOUNT_BANK,
  UPDATE_ACCOUNT_BRANCH,
  UPDATE_IS_MANAGER_CONTACT,
  UPDATE_CONTACT_FULLNAME,
  UPDATE_CONTACT_PHONE_NUMBER,
  UPDATE_CONTACT_EMAIL,
  UPDATE_EMERGENCY_CONTACT_FULLNAME,
  UPDATE_EMERGENCY_CONTACT_RELATIONSHIP,
  UPDATE_EMERGENCY_CONTACT_PHONE_NUMBER,
  UPDATE_FACEBOOK_COST_SHARE_LINK,
  UPDATE_FACEBOOK_COST_PHOTO_POST,
  UPDATE_FACEBOOK_COST_LIVESTREAM,
  UPDATE_FACEBOOK_COST_REPOST_OR_VIDEO,
  UPDATE_INSTAGRAM_COST_PHOTO_POST,
  UPDATE_INSTAGRAM_COST_VIDEO,
  UPDATE_INSTAGRAM_COST_STORY,
  UPDATE_YOUTUBE_COST_VIDEO,
  UPDATE_YOUTUBE_COST_SHARE_LINK
} from '@/eventBus-types.js'
export default {
  name: 'influencer-info',
  components: {
    Icon: () => import('@/components/Icon/Icon.vue'),
    VWDatepicker: () => import('@/components/VWDatepicker/VWDatepicker.vue'),
    InfluencerGeneralInfo: () => import('./GeneralInfo'),
    InfluencerBasicInfo: () => import('./BasicInfo'),
    InfluencerAddressInfo: () => import('./AddressInfo'),
    InfluencerIdentityInfo: () => import('./IdentityInfo'),
    InfluencerBankInfo: () => import('./BankInfo'),
    InfluencerContactInfo: () => import('./ContactInfo'),
    InfluencerCostInfo: () => import('./CostInfo')
  },
  data () {
    return {
      gender: 0,
      isLoading: false,
      isSubmitting: false,
      // Data for binding select loading
      isDistrictLoading: false,
      isWardLoading: false,
      isImageUploading: false,
      influencerData: {
        _id: '',
        status: 0,
        stageName: '',
        description: '',
        fullName: '',
        gender: 0,
        birthday: null, // YYYY-MM-DD
        occupation: [],
        topicOfInterest: [],
        location: [],
        maritalStatus: 0,
        kid: null,
        style: [],
        award: '',
        brandAmbassador: [],
        brandHistory: [],
        // Address
        address: {
          country: '',
          city: null,
          district: null,
          ward: null,
          exactAddress: '',
          addressType: 0
        },
        // Identity Card
        idCard: {
          cardNumber: '',
          issueDate: '', // YYYY-MM-DD
          issuePlace: 0,
          issueImages: []
        },
        // Bank Account
        bank: {
          accountOwner: '',
          bankNumber: '',
          bankName: '',
          bankBranch: ''
        },
        // Contact infomation
        contact: {
          isManager: false,
          fullName: '',
          phoneNumber: '',
          email: ''
        },
        // Emergency contact
        emergencyContact: {
          fullName: '',
          relationship: '',
          phoneNumber: ''
        },
        // Cost
        facebookCost: {
          shareLink: 0,
          photoPost: 0,
          livestream: 0,
          repostOrVideo: 0
        },
        instagramCost: {
          photoPost: 0,
          video: 0,
          story: 0
        },
        youtubeCost: {
          video: 0,
          shareLink: 0
        }
      },
      kidsEnum: [],
      genderEnum: [],
      maritalStatus: [],
      districtAddress: null,
      cityAddress: null
    }
  },
  created () {
    // Subscribe Update Influencer Status
    this.subUpdateInfluencerStatus = this.$geb.getFilteredBus({ id: UPDATE_INFLUENCER_STATUS }).subscribe(data => {
      this.influencerData.status = data.data
      this.updateStatusInfluencer(this.influencerData)
        .then(response => {
          // Show toast when success
          this.makeToast({
            title: 'Update status of influencer successfully',
            variant: 'success'
          })
        })
        .catch(error => {
          // Show toast when error
          this.makeToast({
            title: 'Can not update status of influencer, please try again',
            variant: 'danger'
          })
          console.log(error)
        })
        .finally(() => { this.isSubmitting = false })
    })

    // Subscribe Update of Description
    this.subUpdateDescription = this.$geb.getFilteredBus({ id: UPDATE_INFLUENCER_DESCRIPTION }).subscribe(data => {
      this.influencerData.description = data.data
    })

    // Subscribe Update of Stage Name
    this.subUpdateStageName = this.$geb.getFilteredBus({ id: UPDATE_STAGE_NAME }).subscribe(data => {
      this.influencerData.stageName = data.data
    })

    // Subscribe Update of Gender
    this.subUpdateGender = this.$geb.getFilteredBus({ id: UPDATE_GENDER }).subscribe(data => {
      this.influencerData.gender = data.data
    })

    // Subscribe Update of Date of Birth
    this.subUpdateDateOfBirth = this.$geb.getFilteredBus({ id: UPDATE_DATE_OF_BIRTH }).subscribe(data => {
      this.influencerData.birthday = data.data
    })

    // Subscribe Update of Occupation
    this.subUpdateOccupation = this.$geb.getFilteredBus({ id: UPDATE_OCCUPATION }).subscribe(data => {
      this.influencerData.occupation = data.data
    })

    // Subscribe Update of Topic of interest
    this.subUpdateTopicOfInterest = this.$geb.getFilteredBus({ id: UPDATE_TOPIC_OF_INTEREST }).subscribe(data => {
      this.influencerData.topicOfInterest = data.data
    })

    // Subscribe Update of Location
    this.subUpdateLocation = this.$geb.getFilteredBus({ id: UPDATE_LOCATION }).subscribe(data => {
      let payload = []
      payload.push(data.data)
      this.influencerData.location = payload
    })

    // Subscribe Update of Marital status
    this.subUpdateMaritalStatus = this.$geb.getFilteredBus({ id: UPDATE_MARITAL_STATUS }).subscribe(data => {
      this.influencerData.maritalStatus = data.data
    })

    // Subscribe Update of Kid
    this.subUpdateKid = this.$geb.getFilteredBus({ id: UPDATE_KID }).subscribe(data => {
      this.influencerData.kid = data.data
    })

    // Subscribe Update of Style
    this.subUpdateStyle = this.$geb.getFilteredBus({ id: UPDATE_STYLE }).subscribe(data => {
      this.influencerData.style = data.data
    })

    // Subscribe Update of Award
    this.subUpdateAward = this.$geb.getFilteredBus({ id: UPDATE_AWARD }).subscribe(data => {
      this.influencerData.award = data.data
    })

    // Subscribe Update of Brand Ambassador
    this.subUpdateBrandAmbassador = this.$geb.getFilteredBus({ id: UPDATE_BRAND_AMBASSADOR }).subscribe(data => {
      this.influencerData.brandAmbassador = data.data
    })

    // Subscribe Update of Brand History
    this.subUpdateBrandHistory = this.$geb.getFilteredBus({ id: UPDATE_BRAND_HISTORY }).subscribe(data => {
      this.influencerData.brandHistory = data.data
    })

    // Subscribe Update of Country
    this.subUpdateCountry = this.$geb.getFilteredBus({ id: UPDATE_COUNTRY }).subscribe(data => {
      this.countrySelected(data.data)
    })

    // Subscribe Update of City
    this.subUpdateCity = this.$geb.getFilteredBus({ id: UPDATE_CITY }).subscribe(data => {
      this.citySelected(data.data)
    })

    // Subscribe Update of District
    this.subUpdateDistrict = this.$geb.getFilteredBus({ id: UPDATE_DISTRICT }).subscribe(data => {
      this.districtSelected(data.data)
    })

    // Subscribe Update of Ward
    this.subUpdateWard = this.$geb.getFilteredBus({ id: UPDATE_WARD }).subscribe(data => {
      this.influencerData.address.ward = data.data
    })

    // Subscribe Update of Exact address
    this.subUpdateExactAddress = this.$geb.getFilteredBus({ id: UPDATE_EXACT_ADDRESS }).subscribe(data => {
      this.influencerData.address.exactAddress = data.data
    })

    // Subscribe Update of address type
    this.subUpdateAddressType = this.$geb.getFilteredBus({ id: UPDATE_ADDRESS_TYPE }).subscribe(data => {
      this.influencerData.address.addressType = data.data
    })

    // Subscribe Update of Card Number
    this.subUpdateCardNumber = this.$geb.getFilteredBus({ id: UPDATE_CARD_NUMBER }).subscribe(data => {
      this.influencerData.idCard.cardNumber = data.data
    })

    // Subscribe Update of Card issue date
    this.subUpdateCardIssueDate = this.$geb.getFilteredBus({ id: UPDATE_CARD_ISSUE_DATE }).subscribe(data => {
      this.influencerData.idCard.issueDate = data.data
    })

    // Subscribe Update of Card issue place
    this.subUpdateCardIssuePlace = this.$geb.getFilteredBus({ id: UPDATE_CARD_ISSUE_PLACE }).subscribe(data => {
      this.influencerData.idCard.issuePlace = data.data
    })

    // Subscribe Update of Card issue images
    this.subUpdateCardIssueImages = this.$geb.getFilteredBus({ id: UPDATE_CARD_ISSUE_IMAGES }).subscribe(data => {
      this.influencerData.idCard.issueImages = data.data
    })

    // Subscribe Update of Account Owner
    this.subUpdateAccountOwner = this.$geb.getFilteredBus({ id: UPDATE_ACCOUNT_OWNER }).subscribe(data => {
      this.influencerData.bank.accountOwner = data.data
    })

    // Subscribe Update of Account Number
    this.subUpdateAccountNumber = this.$geb.getFilteredBus({ id: UPDATE_ACCOUNT_NUMBER }).subscribe(data => {
      this.influencerData.bank.bankNumber = data.data
    })

    // Subscribe Update of Account Bank Name
    this.subUpdateAccountBankName = this.$geb.getFilteredBus({ id: UPDATE_ACCOUNT_BANK }).subscribe(data => {
      this.influencerData.bank.bankName = data.data
    })

    // Subscribe Update of Account Bank Branch
    this.subUpdateAccountBankBranch = this.$geb.getFilteredBus({ id: UPDATE_ACCOUNT_BRANCH }).subscribe(data => {
      this.influencerData.bank.bankBranch = data.data
    })

    // Subscribe Update of Is Manager in Contact Info
    this.subUpdateIsManagerContact = this.$geb.getFilteredBus({ id: UPDATE_IS_MANAGER_CONTACT }).subscribe(data => {
      this.influencerData.contact.isManager = data.data
    })

    // Subscribe Update of Fullname in Contact Info
    this.subUpdateContactFullname = this.$geb.getFilteredBus({ id: UPDATE_CONTACT_FULLNAME }).subscribe(data => {
      this.influencerData.contact.fullName = data.data
    })

    // Subscribe Update of Phone Number in Contact Info
    this.subUpdateContactPhoneNumber = this.$geb.getFilteredBus({ id: UPDATE_CONTACT_PHONE_NUMBER }).subscribe(data => {
      this.influencerData.contact.phoneNumber = data.data
    })

    // Subscribe Update of Email in Contact Info
    this.subUpdateContactEmail = this.$geb.getFilteredBus({ id: UPDATE_CONTACT_EMAIL }).subscribe(data => {
      this.influencerData.contact.email = data.data
    })

    // Subscribe Update of Fullname in Emergency Contact Info
    this.subUpdateEmergencyContactFullname = this.$geb.getFilteredBus({ id: UPDATE_EMERGENCY_CONTACT_FULLNAME }).subscribe(data => {
      this.influencerData.emergencyContact.fullName = data.data
    })

    // Subscribe Update of Relationship in Emergency Contact Info
    this.subUpdateEmergencyContactRelationship = this.$geb.getFilteredBus({ id: UPDATE_EMERGENCY_CONTACT_RELATIONSHIP }).subscribe(data => {
      this.influencerData.emergencyContact.relationship = data.data
    })

    // Subscribe Update of Phone Number in Emergency Contact Info
    this.subUpdateEmergencyContactPhoneNumber = this.$geb.getFilteredBus({ id: UPDATE_EMERGENCY_CONTACT_PHONE_NUMBER }).subscribe(data => {
      this.influencerData.emergencyContact.phoneNumber = data.data
    })

    // Subscribe Update of Share Link in Facebook Cost Info
    this.subUpdateFacebookCostShareLink = this.$geb.getFilteredBus({ id: UPDATE_FACEBOOK_COST_SHARE_LINK }).subscribe(data => {
      this.influencerData.facebookCost.shareLink = data.data
    })

    // Subscribe Update of Photo Post in Facebook Cost Info
    this.subUpdateFacebookCostPhotoPost = this.$geb.getFilteredBus({ id: UPDATE_FACEBOOK_COST_PHOTO_POST }).subscribe(data => {
      this.influencerData.facebookCost.photoPost = data.data
    })

    // Subscribe Update of Livestream in Facebook Cost Info
    this.subUpdateFacebookCostLivestream = this.$geb.getFilteredBus({ id: UPDATE_FACEBOOK_COST_LIVESTREAM }).subscribe(data => {
      this.influencerData.facebookCost.livestream = data.data
    })

    // Subscribe Update of Repost Or Video in Facebook Cost Info
    this.subUpdateFacebookCostRepostOfVideo = this.$geb.getFilteredBus({ id: UPDATE_FACEBOOK_COST_REPOST_OR_VIDEO }).subscribe(data => {
      this.influencerData.facebookCost.repostOrVideo = data.data
    })

    // Subscribe Update of Photo Post in Instagram Cost Info
    this.subUpdateInstagramCostPhotoPost = this.$geb.getFilteredBus({ id: UPDATE_INSTAGRAM_COST_PHOTO_POST }).subscribe(data => {
      this.influencerData.instagramCost.photoPost = data.data
    })

    // Subscribe Update of Video in Instagram Cost Info
    this.subUpdateInstagramCostVideo = this.$geb.getFilteredBus({ id: UPDATE_INSTAGRAM_COST_VIDEO }).subscribe(data => {
      this.influencerData.instagramCost.video = data.data
    })

    // Subscribe Update of Story in Instagram Cost Info
    this.subUpdateInstagramCostStory = this.$geb.getFilteredBus({ id: UPDATE_INSTAGRAM_COST_STORY }).subscribe(data => {
      this.influencerData.instagramCost.story = data.data
    })

    // Subscribe Update of Video in Youtube Cost Info
    this.subUpdateYoutubeCostVideo = this.$geb.getFilteredBus({ id: UPDATE_YOUTUBE_COST_VIDEO }).subscribe(data => {
      this.influencerData.youtubeCost.video = data.data
    })

    // Subscribe Update of Share Link in Youtube Cost Info
    this.subUpdateYoutubeCostShareLink = this.$geb.getFilteredBus({ id: UPDATE_YOUTUBE_COST_SHARE_LINK }).subscribe(data => {
      this.influencerData.youtubeCost.shareLink = data.data
    })
    this._fetchData()
  },
  beforeDestroy () {
    // Detroy all event bus
    if (this.subUpdateInfluencerStatus) {
      this.subUpdateInfluencerStatus.unsubscribe()
    }
    if (this.subUpdateDescription) {
      this.subUpdateDescription.unsubscribe()
    }
    if (this.subUpdateCountry) {
      this.subUpdateCountry.unsubscribe()
    }
    if (this.subUpdateCity) {
      this.subUpdateCity.unsubscribe()
    }
    if (this.subUpdateDistrict) {
      this.subUpdateDistrict.unsubscribe()
    }
    if (this.subUpdateWard) {
      this.subUpdateWard.unsubscribe()
    }
    if (this.subUpdateExactAddress) {
      this.subUpdateExactAddress.unsubscribe()
    }
    if (this.subUpdateMaritalStatus) {
      this.subUpdateMaritalStatus.unsubscribe()
    }
    if (this.subUpdateStageName) {
      this.subUpdateStageName.unsubscribe()
    }
    if (this.subUpdateDateOfBirth) {
      this.subUpdateDateOfBirth.unsubscribe()
    }
    if (this.subUpdateTopicOfInterest) {
      this.subUpdateTopicOfInterest.unsubscribe()
    }
    if (this.subUpdateLocation) {
      this.subUpdateLocation.unsubscribe()
    }
    if (this.subUpdateKid) {
      this.subUpdateKid.unsubscribe()
    }
    if (this.subUpdateStyle) {
      this.subUpdateStyle.unsubscribe()
    }
    if (this.subUpdateAward) {
      this.subUpdateAward.unsubscribe()
    }
    if (this.subUpdateBrandAmbassador) {
      this.subUpdateBrandAmbassador.unsubscribe()
    }
    if (this.subUpdateBrandHistory) {
      this.subUpdateBrandHistory.unsubscribe()
    }
    if (this.subUpdateCardNumber) {
      this.subUpdateCardNumber.unsubscribe()
    }
    if (this.subUpdateAddressType) {
      this.subUpdateAddressType.unsubscribe()
    }
    if (this.subUpdateCardIssueDate) {
      this.subUpdateCardIssueDate.unsubscribe()
    }
    if (this.subUpdateCardIssuePlace) {
      this.subUpdateCardIssuePlace.unsubscribe()
    }
    if (this.subUpdateCardIssueImages) {
      this.subUpdateCardIssueImages.unsubscribe()
    }
    if (this.subUpdateAccountOwner) {
      this.subUpdateAccountOwner.unsubscribe()
    }
    if (this.subUpdateAccountNumber) {
      this.subUpdateAccountNumber.unsubscribe()
    }
    if (this.subUpdateAccountBankName) {
      this.subUpdateAccountBankName.unsubscribe()
    }
    if (this.subUpdateAccountBankBranch) {
      this.subUpdateAccountBankBranch.unsubscribe()
    }
    if (this.subUpdateIsManagerContact) {
      this.subUpdateIsManagerContact.unsubscribe()
    }
    if (this.subUpdateContactFullname) {
      this.subUpdateContactFullname.unsubscribe()
    }
    if (this.subUpdateContactPhoneNumber) {
      this.subUpdateContactPhoneNumber.unsubscribe()
    }
    if (this.subUpdateContactEmail) {
      this.subUpdateContactEmail.unsubscribe()
    }
    if (this.subUpdateEmergencyContactFullname) {
      this.subUpdateEmergencyContactFullname.unsubscribe()
    }
    if (this.subUpdateEmergencyContactRelationship) {
      this.subUpdateEmergencyContactRelationship.unsubscribe()
    }
    if (this.subUpdateEmergencyContactPhoneNumber) {
      this.subUpdateEmergencyContactPhoneNumber.unsubscribe()
    }
    if (this.subUpdateFacebookCostShareLink) {
      this.subUpdateFacebookCostShareLink.unsubscribe()
    }
    if (this.subUpdateFacebookCostPhotoPost) {
      this.subUpdateFacebookCostPhotoPost.unsubscribe()
    }
    if (this.subUpdateFacebookCostLivestream) {
      this.subUpdateFacebookCostLivestream.unsubscribe()
    }
    if (this.subUpdateFacebookCostRepostOfVideo) {
      this.subUpdateFacebookCostRepostOfVideo.unsubscribe()
    }
    if (this.subUpdateInstagramCostPhotoPost) {
      this.subUpdateInstagramCostPhotoPost.unsubscribe()
    }
    if (this.subUpdateInstagramCostVideo) {
      this.subUpdateInstagramCostVideo.unsubscribe()
    }
    if (this.subUpdateInstagramCostStory) {
      this.subUpdateInstagramCostStory.unsubscribe()
    }
    if (this.subUpdateYoutubeCostVideo) {
      this.subUpdateYoutubeCostVideo.unsubscribe()
    }
    if (this.subUpdateYoutubeCostShareLink) {
      this.subUpdateYoutubeCostShareLink.unsubscribe()
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': '_fetchData'
  },
  computed: {
    ...mapState({
      dataHub: state => state.dataHub,
      currentInfluencer: state => state.influencer.currentInfluencer,
      params () { return this.$route.params },
      cityList: state => state.address.cityList,
      districtList: state => state.address.districtList,
      wardList: state => state.address.wardList
    })
  },
  methods: {
    ...mapActions({
      getDataHub: `dataHub/${GET_DATA_HUB}`,
      getInfluencer: `influencer/${GET_INFLUENCER}`,
      updateInfluencer: `influencer/${UPDATE_INFLUENCER}`,
      updateStatusInfluencer: `influencer/${UPDATE_STATUS_INFLUENCER}`,
      getDistrictList: `address/${GET_DISTRICT_LIST}`,
      getWardList: `address/${GET_WARD_LIST}`,
      updateDistrictList: `address/${UPDATE_DISTRICT_LIST}`,
      updateWardList: `address/${UPDATE_WARD_LIST}`,
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async _fetchData () {
      if (this.$route.params.id) {
        this.isLoading = true
        try {
          let { data } = await this.getInfluencer(this.$route.params.id)
          // Prepare dataHub, enum for select fields
          this.genderEnum = genderEnum
          this.kidsEnum = kidsEnum
          this.maritalStatusEnum = maritalStatusEnum
          this.addressTypeEnum = addressTypeEnum
          if (data.success) {
            // Merge response data with current data of Influencer
            let mergeObjectData = { ...this.influencerData, ...data.data }
            // Assign merge data to current Influencer data
            this.influencerData = mergeObjectData
            if (this.influencerData.address.city) {
              return this.getDistrictList(this.influencerData.address.city)
            }
            if (this.influencerData.address.city && this.influencerData.address.district) {
              return this.getWardList({ cityId: this.influencerData.address.city, districtId: this.influencerData.address.district })
            }
          }
        } catch (err) {
          console.error('Failed: ', err)
        } finally {
          this.isLoading = false
        }
      }
    },
    updateInfluencerStatus (value) {
      this.influencerData.status = value
      this.updateStatusInfluencer(this.influencerData)
        .then(response => {
          // Show toast when success
          this.makeToast({
            title: 'Update status of influencer successfully',
            variant: 'success'
          })
        })
        .catch(error => {
          // Show toast when error
          this.makeToast({
            title: 'Can not update status of influencer, please try again',
            variant: 'danger'
          })
          console.log(error)
        })
        .finally(() => { this.isSubmitting = false })
    },
    countrySelected (value) {
      this.influencerData.address.country = value
    },
    citySelected (value) {
      this.influencerData.address.city = value
      // Reset District and Ward List
      this.updateDistrictList([])
      this.updateWardList([])

      // Reset selected data of district and ward
      this.influencerData.address.district = null
      this.influencerData.address.ward = null

      // Get new district list
      this.getDistrictList(value).catch(error => {
        console.log(error)
        this.makeToast({
          title: 'Can not get district list',
          variant: 'danger'
        })
      })
    },
    districtSelected (value) {
      this.influencerData.address.district = value

      // Reset Ward List
      this.updateWardList([])

      // Get ward list
      this.getWardList({ cityId: this.influencerData.address.city, districtId: this.influencerData.address.district }).catch(error => {
        console.log(error)
        this.makeToast({
          title: 'Can not get ward list',
          variant: 'danger'
        })
      })
    },
    // Update fields with empty string to null before submitting
    _preProcessingData (data) {
      Object.keys(data).forEach(key => {
        if (typeof (data[key]) === 'string' && data[key] === '') {
          data[key] = null
        }
      })
      // Update Fullname if Name/Stage Name exists
      if (data.stageName) {
        data.fullName = data.stageName
      }
    },
    handleSubmitClick: function () {
      this.isSubmitting = true
      this._preProcessingData(this.influencerData)
      this.updateInfluencer(this.influencerData)
        .then(response => {
          this.influencerData = response.data.data
          this.makeToast({
            title: 'Update influencer successfully',
            variant: 'success'
          })
        })
        .catch(error => {
          console.log('[Error]', error)
          // Show error
          this.makeToast({
            title: 'Can not update influencer, please try again',
            variant: 'danger'
          })
        })
        .finally(() => { this.isSubmitting = false })
    }
  }
}
