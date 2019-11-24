import { env } from '@/config'
import { debounce } from 'lodash'
import { mapActions } from 'vuex'
import {
  MAKE_TOAST,
  GET_LIST_INFLUENCER
} from '@/store/action-types'
import {
  influencerTableFields,
  tableItemsPerPage
} from '@/variables'

export default {
  name: 'influence-list',
  components: {
    Icon: () => import('@/components/Icon/Icon'),
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    InfluencerListItemAction: () => import('./ItemAction')
  },
  data () {
    return {
      fields: influencerTableFields,
      influencerList: [],
      query: '',
      isBusy: false,
      total: null,
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: ''
    }
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      _getListInfluencer: `influencer/${GET_LIST_INFLUENCER}`
    }),
    async getListInfluencer () {
      try {
        let url = `${env.API.INFLUENCER}?`
        url += `limit=${this.itemsPerPage}`
        url += `&offset=${(this.currentPage - 1) * this.itemsPerPage}`
        url += this.sort ? `&sort=${this.sort}` : '&sort=-updatedAt'
        url += this.query ? `&query=${this.query}` : ''
        // Active Indicator
        this.isBusy = true
        // Get API
        let response = await this._getListInfluencer(url)

        if (response.data && response.data.success) {
          // Update list
          this.influencerList = response.data.data.docs
          // console.log(this.influencerList)
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
    handleRemoveInfluencer () {
      // Get updated list
      this.getListInfluencer()
    },
    handleQueryChange: debounce(function () {
      this.getListInfluencer()
    }, 1500),
    handleClearSearch () {
      this.query = ''
      this.getListInfluencer()
    },
    handlePerPageChange () {
      this.getListInfluencer()
    },
    handlePaginationChange () {
      this.getListInfluencer()
    },
    handleSortChange (ctx) {
      this.sort = `${ctx.sortDesc ? '-' : ''}${ctx.sortBy}`
      this.getListInfluencer()
    }
  },
  mounted () {
    this.getListInfluencer()
  }
}
