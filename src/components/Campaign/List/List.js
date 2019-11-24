import { debounce } from 'lodash'
import { mapActions, mapState } from 'vuex'
import {
  MAKE_TOAST,
  GET_LIST_CAMPAIGN
} from '@/store/action-types'
import {
  campaignListTableFields,
  tableItemsPerPage
} from '@/variables'

export default {
  name: 'campaign-list',
  components: {
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    CampaignListItemAction: () => import('./ItemAction')
  },
  data () {
    return {
      fields: campaignListTableFields,
      campaignList: [],
      query: '',
      isBusy: false,
      total: null,
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: ''
    }
  },
  computed: {
    ...mapState({
      croleName: state => state.user.currentUser.roleName
    })
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      _getListCampaign: `campaign/${GET_LIST_CAMPAIGN}`
    }),
    async getListCampaign () {
      try {
        let options = `limit=${this.itemsPerPage}`
        options += `&offset=${(this.currentPage - 1) * this.itemsPerPage}`
        options += this.sort ? `&sort=${this.sort}` : '&sort=-updatedAt'
        options += this.query ? `&query=${this.query}` : ''
        // Active Indicator
        this.isBusy = true
        // Get API
        let response = await this._getListCampaign(options)
        // console.log(response)
        if (response.data && response.data.success) {
          // Update list
          this.campaignList = response.data.data.docs
          // Update total
          this.total = response.data.data.totalDocs
        }
      } catch (error) {
        // eslint-disable-console
        console.log(error)
        // Show error
        this.makeToast({
          title: 'Cannot get list, please try again',
          variant: 'danger'
        })
      } finally {
        // Deactive Indicator
        this.isBusy = false
      }
    },
    handleRemoveCampaign () {
      // Get updated list
      this.getListCampaign()
    },
    handleQueryChange: debounce(function () {
      this.getListCampaign()
    }, 1500),
    handleClearSearch () {
      this.query = ''
      this.getListCampaign()
    },
    handlePerPageChange () {
      this.getListCampaign()
    },
    handlePaginationChange () {
      this.getListCampaign()
    },
    handleSortChange (ctx) {
      this.sort = `${ctx.sortDesc ? '-' : ''}${ctx.sortBy}`
      this.getListCampaign()
    }
  },
  mounted () {
    this.getListCampaign()
  }
}
