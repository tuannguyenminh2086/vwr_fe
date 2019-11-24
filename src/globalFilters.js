import Vue from 'vue'
import { influencerStatusEnum } from './variables'

Vue.filter('adjustIndex', value => {
  let vPlus1 = value + 1
  if (vPlus1 > 9) {
    return vPlus1
  }
  return `0${vPlus1}`
})

Vue.filter('addZero', value => {
  if (value > 9 || value === 0) {
    return value
  }
  return `0${value}`
})

Vue.filter('convertDate', value => {
  let date = new Date(value).toString()
  return date.slice(4, 10) + ',' + date.slice(10, 15)
})

Vue.filter('convertInfluencerStatus', value => {
  if (value) {
    return influencerStatusEnum.find(x => x._id === value).label
  } else {
    return 'Pending'
  }
})

Vue.filter('roundPercent', value => {
  let numValue = Number(value)
  return isNaN(numValue) ? 0 : numValue.toFixed(1)
})

Vue.filter('formatNumber', value => {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'
})
