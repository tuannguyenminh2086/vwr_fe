<template>
  <div class="vw-table">
    <div class="vw-table__control vw-table__control--justify-between">
      <div class="vw-table__control-col">
        <b-button class="vw-button vw-button--success vw-button--large" :to="{ name: 'create-report' }">Create Report</b-button>
      </div>
      <div class="vw-table__control-col vw-table__control-col--50">
        <TableSearch :query.sync="query" />
      </div>
    </div>
    <div class="vw-table__table">
      <b-table
        show-empty
        responsive
        tbody-tr-class="vw-table__table-row"
        :items="filteredReports"
        :fields="fields"
        :per-page="itemsPerPage"
        :current-page="currentPage"
        :busy="loading"
        :filter="query"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        >
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="report" slot-scope="data">
          <router-link class="vw-table__table-link" :to="{ name: 'detail-report', params: { id: data.item._id, name: data.item.name } }">
            {{ data.item.name }}
          </router-link>
        </template>
        <template slot="post" slot-scope="data">{{ data.item.totalPost | formatNumber }}</template>
        <template slot="engagement" slot-scope="data">{{ data.item.kpiEngagement | formatNumber }}</template>
        <template slot="view" slot-scope="data">{{ data.item.kpiView | formatNumber}}</template>
        <template slot="cost" slot-scope="data">{{ data.item.cost | currency('$', 0, { decimalSeparator: ',' })  }}</template>
        <template slot="timeAdded" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
        <template slot="actions" slot-scope="data">
          <TableActon v-if="cUser.roleName !=='Staff'" :item="data.item" :buttons="buttons"></TableActon>
        </template>
      </b-table>
    </div>
    <div class="vw-table__control vw-table__control--footer vw-table__control--justify-end vw-table__control--align-center" v-if="!isBusy">
      <div class="vw-table__control-col vw-table__control-col--pull-left">
        <TableCounter :total="total" />
      </div>
      <div class="vw-table__control-col">
        <TableItemsPerPage
          :itemsPerPage.sync="itemsPerPage"
          :optionItemsPerPage="optionItemsPerPage"
        />
      </div>
      <div class="vw-table__control-col">
        <TablePagination
          :currentPage.sync="currentPage"
          :total="total"
          :itemsPerPage="itemsPerPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { filter, size } from 'lodash'
import {
  tableItemsPerPage,
  modalConfirmConfig
} from '@/variables'
import {
  MAKE_TOAST
} from '@/store/action-types'

export default {
  name: 'ClientReports',
  components: {
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    TableActon: () => import('@/components/Elements/ActionListButton')
  },
  props: {
    cid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      query: '',
      isBusy: false,
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: '',
      sortBy: 'createdAt',
      sortDesc: true,
      items: [],
      fields: [
        { key: 'id', label: '#', class: 'id-column text-center' },
        { key: 'report', label: 'Report', class: 'report-column', sortable: true },
        { key: 'post', label: 'Post', class: 'post-column', tdClass: 'text-right', sortable: true },
        { key: 'engagement', label: 'Engagement', class: 'engagement-column', tdClass: 'text-right', sortable: true },
        { key: 'view', label: 'View', class: 'view-column', tdClass: 'text-right', sortable: true },
        { key: 'cost', label: 'Cost', tdClass: 'text-right', class: 'cost-column', sortable: true },
        { key: 'timeAdded', label: 'Time Added', class: 'time-added-column', sortable: true },
        { key: 'actions', label: '', class: 'actions-column' }
      ],
      buttons: [
        {
          title: 'Remove',
          handler: (i, event, payload) => {
            this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
              .then(value => {
                if (value && payload) {
                  if (this.cUser.roleName !== 'Staff') {
                    this.removeClientReportById(payload._id)
                  }
                }
              })
              .catch(err => {
              // An error occurred
                console.log(err)
              })
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.clients.loading,
      cUser: state => state.user.currentUser,
      reports: state => state.clients.client.reports
    }),
    filteredReports () {
      let reports = this.reports
      if (reports) {
        return filter(reports, o => { return o.status !== 3 })
      } else {
        return reports
      }
    },
    total () {
      return size(this.reports)
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      fetchAllClientReports: 'clients/getReportByCID',
      removeReport: 'reports/removeReportById',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async removeClientReportById (rid) {
      try {
        await this.removeReport(rid)
      } catch (error) {
        console.log(error)
      } finally {
        this.fetchData()
      }
    },
    fetchData () {
      this.fetchAllClientReports(this.cid)
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>

</style>
