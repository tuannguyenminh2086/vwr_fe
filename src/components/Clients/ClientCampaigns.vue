<template>
  <div class="vw-table">
    <div class="vw-table__control vw-table__control--justify-between">
      <div class="vw-table__control-col">
        <b-button
          v-if="croleName !=='Staff'"
          class="vw-button vw-button--primary vw-button--large"
          :to="{ name: 'campaign-create' }">
          Add Campaign
        </b-button>
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
        :items="campaigns"
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
        <template slot="campaignName" slot-scope="data">
          <router-link class="vw-table__table-link" :to="{ name: 'campaign-detail', params: { id: data.item._id } }">{{ data.item.name }}</router-link>
        </template>
        <template slot="brand" slot-scope="data"><span v-if="data.item.brand">{{ data.item.brand.label }}</span></template>
        <template slot="influencer" slot-scope="data">{{ data.item.totalInfluencer | formatNumber }}</template>
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
import { size } from 'lodash'
import {
  tableItemsPerPage,
  modalConfirmConfig
} from '@/variables'
import {
  MAKE_TOAST,
  DELETE_CAMPAIGN
} from '@/store/action-types'

export default {
  name: 'ClientCampaigns',
  components: {
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    TableLoading: () => import('@/components/Table/Loading')
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
        { key: 'campaignName', label: 'Campaign', class: 'campaign-column', tdClass: 'campaign-column-td', sortable: true },
        { key: 'brand', label: 'Brand', class: 'brand-column', sortable: true },
        { key: 'influencer', label: 'Influencer', class: 'influencer-column influencer-column--small', tdClass: 'influencer-column text-right', sortable: true },
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
                    this.deleteClientCampaign(payload._id)
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
      croleName: state => state.user.currentUser.roleName,
      cUser: state => state.user.currentUser,
      campaigns: state => state.clients.client.campaigns
    }),
    total () {
      return size(this.campaigns)
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      fetchAllClientCampaigns: 'clients/getCampaignByCID',
      _deleteCampaign: `campaign/${DELETE_CAMPAIGN}`,
      makeToast: `toast/${MAKE_TOAST}`
    }),
    fetchData () {
      this.fetchAllClientCampaigns(this.cid)
    },
    async deleteClientCampaign (id) {
      try {
        await this._deleteCampaign(id)
      } catch (error) {
        console.log(error)
      } finally {
        this.fetchData()
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
</style>
