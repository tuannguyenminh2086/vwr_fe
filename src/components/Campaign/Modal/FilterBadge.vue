<template>
  <Tag :label="label" @onRemoveTag="handleRemoveTag" />
</template>

<script>
import { REMOVE_FILTER_TAG } from '@/eventBus-types'

export default {
  name: 'campaign-modal-influencer-filter-badge',
  props: {
    item: Object
  },
  components: {
    Tag: () => import('@/components/Elements/Tag.vue')
  },
  data () {
    return {
    }
  },
  computed: {
    label () {
      let res = `${this.item.title}: `
      switch (this.item.id) {
        case 'name':
        case 'link':
          res += this.item.value
          break
        case 'audience':
        case 'averageEngagement':
          if (this.item.from && this.item.to) {
            if (this.item.from === this.item.to) {
              res += this.item.from
            } else {
              res += `${this.item.from} - ${this.item.to}`
            }
          } else {
            res += this.item.from ? `${this.item.from}+` : ''
            res += this.item.to ? `upto ${this.item.to}` : ''
          }
          break
        case 'style':
        case 'maritalStatus':
        case 'kid':
          res += this.item.value.label
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
          res += `select(${this.item.value.length})`
          break
        case 'fanInsightAge':
        case 'fanInsightGender':
        case 'fanInsightLocation':
          res += `select(${this.item.value.list.filter(x => x.checked).length})`
          break
        default:
          break
      }
      return res
    }
  },
  methods: {
    handleRemoveTag () {
      this.$geb.emit({
        id: REMOVE_FILTER_TAG,
        value: this.item.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
