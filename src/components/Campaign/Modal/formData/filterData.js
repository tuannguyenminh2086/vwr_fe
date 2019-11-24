import FanAgeData from './fanAgeData'
import FanGenderData from './fanGenderData'
import FanLocationData from './fanLocationData'

export default class FilterData {
  constructor () {
    // Basic
    this.name = {
      id: 'name',
      title: 'Search by name',
      value: null
    }
    this.link = {
      id: 'link',
      title: 'Channel/ Profile link of Influencer',
      value: null
    }
    this.platform = {
      id: 'platform',
      title: 'Platform',
      value: []
    }
    this.audience = {
      id: 'audience',
      title: 'Audience',
      from: null,
      to: null
    }
    this.level = {
      id: 'level',
      title: 'Influencer level',
      value: []
    }
    this.averageEngagement = {
      id: 'averageEngagement',
      title: 'Avg. Engagement',
      from: null,
      to: null
    }
    // Advance
    this.topicOfInterest = {
      id: 'topicOfInterest',
      title: 'Topic of interest',
      value: []
    }
    this.location = {
      id: 'location',
      title: 'Location',
      value: []
    }
    this.occupation = {
      id: 'occupation',
      title: 'Occupation',
      value: []
    }
    this.age = {
      id: 'age',
      title: 'Age',
      value: []
    }
    this.gender = {
      id: 'gender',
      title: 'Gender',
      value: []
    }
    this.style = {
      id: 'style',
      title: 'Style',
      value: null
    }
    this.maritalStatus = {
      id: 'maritalStatus',
      title: 'Marital Status',
      value: null
    }
    this.kid = {
      id: 'kid',
      title: 'Kid',
      value: null
    }
    this.brandAmbassador = {
      id: 'brandAmbassador',
      title: 'Brand Ambassador',
      value: []
    }
    this.brandHistory = {
      id: 'brandHistory',
      title: 'Brand History',
      value: []
    }
    // Fan Insight
    this.fanInsightAge = {
      id: 'fanInsightAge',
      title: 'Fan\'s age (at least)',
      value: new FanAgeData()
    }
    this.fanInsightGender = {
      id: 'fanInsightGender',
      title: 'Fan\'s gender',
      value: new FanGenderData()
    }
    this.fanInsightLocation = {
      id: 'fanInsightLocation',
      title: 'Fan\'s location',
      value: new FanLocationData()
    }
    this.itemsPerPage = 8
    this.currentPage = 1
    this.sort = ''
  }
  resetData () {
    // Basic
    this.name.value = null
    this.link.value = null
    this.platform.value = []
    this.audience.from = null
    this.audience.to = null
    this.level.value = []
    this.averageEngagement.from = null
    this.averageEngagement.to = null
    // Advance
    this.topicOfInterest.value = []
    this.location.value = []
    this.occupation.value = []
    this.age.value = []
    this.gender.value = []
    this.style.value = null
    this.maritalStatus.value = null
    this.kid.value = null
    this.brandAmbassador.value = []
    this.brandHistory.value = []
    // Fan Insight
    this.fanInsightAge.value = new FanAgeData()
    this.fanInsightGender.value = new FanGenderData()
    this.fanInsightLocation.value = new FanLocationData()

    this.itemsPerPage = 8
    this.currentPage = 1
    this.sort = ''
  }
  convertToTag () {
    let tagList = []

    this.name.value ? tagList.push(this.name) : void (0)
    this.link.value ? tagList.push(this.link) : void (0)
    this.platform.value.length > 0 ? tagList.push(this.platform) : void (0)
    this.audience.from || this.audience.to ? tagList.push(this.audience) : void (0)
    this.level.value.length > 0 ? tagList.push(this.level) : void (0)
    this.averageEngagement.from || this.averageEngagement.to ? tagList.push(this.averageEngagement) : void (0)

    this.topicOfInterest.value.length > 0 ? tagList.push(this.topicOfInterest) : void (0)
    this.location.value.length > 0 ? tagList.push(this.location) : void (0)
    this.occupation.value.length > 0 ? tagList.push(this.occupation) : void (0)
    this.age.value.length > 0 ? tagList.push(this.age) : void (0)
    this.gender.value.length > 0 ? tagList.push(this.gender) : void (0)
    this.style.value ? tagList.push(this.style) : void (0)
    this.maritalStatus.value ? tagList.push(this.maritalStatus) : void (0)
    this.kid.value ? tagList.push(this.kid) : void (0)
    this.brandAmbassador.value.length > 0 ? tagList.push(this.brandAmbassador) : void (0)
    this.brandHistory.value.length > 0 ? tagList.push(this.brandHistory) : void (0)

    this.fanInsightAge.value.isEmpty() ? tagList.push(this.fanInsightAge) : void (0)
    this.fanInsightGender.value.isEmpty() ? tagList.push(this.fanInsightGender) : void (0)
    this.fanInsightLocation.value.isEmpty() ? tagList.push(this.fanInsightLocation) : void (0)

    return tagList
  }
  removeTag (id) {
    switch (id) {
      case 'name':
      case 'link':
      case 'style':
      case 'maritalStatus':
      case 'kid':
        this[id].value = null
        break
      case 'audience':
      case 'averageEngagement':
        this[id].from = null
        this[id].to = null
        break
      case 'platform':
      case 'level':
      case 'topicOfInterest':
      case 'location':
      case 'occupation':
      case 'age':
      case 'gender':
      case 'brandAmbassador':
      case 'brandHistory':
        this[id].value = []
        break
      case 'fanInsightAge':
        this[id].value = new FanAgeData()
        break
      case 'fanInsightGender':
        this[id].value = new FanGenderData()
        break
      case 'fanInsightLocation':
        this[id].value = new FanLocationData()
        break
      default:
        break
    }
  }
  getDataToSubmit () {
    return {
      name: this.name.value,
      link: this.link.value,
      platform: this.platform.value.map(x => x._id),
      audienceFrom: this.audience.from,
      audienceTo: this.audience.to,
      level: this.level.value.map(x => x._id),
      averageEngagementFrom: this.averageEngagement.from,
      averageEngagementTo: this.averageEngagement.to,
      topicOfInterest: this.topicOfInterest.value.map(x => x._id),
      location: this.location.value.map(x => x._id),
      occupation: this.occupation.value.map(x => x._id),
      age: this.age.value.map(x => x.label),
      gender: this.gender.value.map(x => x._id),
      style: this.style.value ? this.style.value._id : null,
      maritalStatus: this.maritalStatus.value ? this.maritalStatus.value._id : null,
      kid: this.kid.value ? this.kid.value._id : null,
      brandAmbassador: this.brandAmbassador.value.map(x => x._id),
      brandHistory: this.brandHistory.value.map(x => x._id),
      fanInsightAge: this.fanInsightAge.value.getDataToSubmit(),
      fanInsightGender: this.fanInsightGender.value.getDataToSubmit(),
      fanInsightLocation: this.fanInsightLocation.value.getDataToSubmit(),
      limit: this.itemsPerPage,
      offset: (this.currentPage - 1) * this.itemsPerPage,
      sort: this.sort ? this.sort : null
    }
  }
}
