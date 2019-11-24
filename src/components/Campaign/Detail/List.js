import {
  campaignInfluencerTableField,
  tableItemsPerPage
} from '@/variables'

export default {
  name: 'campaign-influencer-list',
  components: {
    TableSearch: () => import('@/components/Table/Search.vue'),
    TableCounter: () => import('@/components/Table/Counter.vue'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage.vue'),
    TablePagination: () => import('@/components/Table/Pagination.vue'),
    TableLoading: () => import('@/components/Table/Loading.vue'),
    Icon: () => import('@/components/Icon/Icon.vue'),
    TableItemCost: () => import('./CostColumn.vue'),
    InfluencerListItemAction: () => import('./ItemAction.vue')
  },
  props: {
    isCreate: Boolean,
    isEditable: Boolean,
    isTableBusy: Boolean,
    influencerList: Array,
    campaignInfluencerListState: Boolean,
    campaignInfluencerListFeedback: String,
    total: Number,
    currentPage: Number,
    itemsPerPage: Number,
    sort: String,
    query: String
  },
  data () {
    return {
      fields: campaignInfluencerTableField,
      optionItemsPerPage: tableItemsPerPage,
      localTotal: 0
    }
  },
  watch: {
    total (value) {
      this.localTotal = this.total
    }
  },
  computed: {
    tableClass () {
      return {
        'vw-table__table': true,
        'vw-table__table--error': this.campaignInfluencerListState === false
      }
    },
    addInfluencerButtonClass () {
      return {
        'vw-button': true,
        'vw-button--primary': true,
        'disabled': !this.isCreate && !this.isEditable
      }
    }
  },
  methods: {
    handleAddClick () {
      this.$bvModal.show('modal-campaign-influencer-filter')
    },
    handleInputQuery (value) {
      this.$emit('update:query', value)
    },
    handleClearSearch () {
      this.$emit('update:query', '')
    },
    filterFunction (item, filter) {
      let filterReg = new RegExp(filter, 'i')
      return filterReg.test(item.influencer.fullName)
    },
    handleFiltered (fitleredItems) {
      this.localTotal = fitleredItems.length
      this.currentPage = 1
    },
    handleToggleEditCost (payload) {
      this.$emit('onToggleEditCost', payload)
    },
    handleInputCost (value) {
      this.$emit('onInputCost', value)
    },
    handleSave (id) {
      this.$emit('onSaveCost', id)
    },
    handleRemoveInfluencer (id) {
      this.$emit('onRemoveInfluencer', id)
    },
    handleClickDownload () {
      this.$emit('onClickDownload')
    }
  }
}
