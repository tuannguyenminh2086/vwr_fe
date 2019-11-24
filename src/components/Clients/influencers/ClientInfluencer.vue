<template>
  <div class="vw-table">
    <div class="vw-table__control vw-table__control--justify-between">
      <div class="vw-table__control-col"></div>
      <div class="vw-table__control-col vw-table__control-col--50">
        <TableSearch :query.sync="query" />
      </div>
    </div>
    <div class="vw-table__table">
      <b-table
        show-empty
        responsive
        tbody-tr-class="vw-table__table-row"
        :items="influencers"
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
        <template slot="fullName" slot-scope="data">
          <span class="vw-table__table-influencer">
            <span class="vw-table__table-influencer-avatar">
              <img :src="data.item.avatar ? data.item.avatar.thumbnailUrl : 'https://via.placeholder.com/32/666'" :alt="data.item.fullName">
            </span>
            <router-link class="vw-table__table-link vw-table__table-influencer-name" :to="{ name: 'influencer-detail', params: { id: data.item.id } }">
              {{ data.item.fullName }}
            </router-link>
          </span>
        </template>
        <template slot="socials" slot-scope="data">
          <span class="vw-table__table-platforms">
            <span
              :class="`vw-table__table-platform vw-table__table-platform--${s.platform.toLowerCase()}`"
              v-for="s in data.item.socials"
              :key="s.platform">
              <Icon :name="`${s.platform.toLowerCase()}-circle`" />
            </span>
          </span>
        </template>
        <template slot="status" slot-scope="data">
          <span class="vw-table__table-status" :status="data.item.status | convertInfluencerStatus">
            {{ data.item.status | convertInfluencerStatus }}
          </span>
        </template>
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
  influencerTableFields,
  modalConfirmConfig
} from '@/variables'
import {
  MAKE_TOAST
} from '@/store/action-types'

export default {
  name: 'ClientInfluencer',
  components: {
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    TableLoading: () => import('@/components/Table/Loading')
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
      fields: influencerTableFields,
      buttons: [
        {
          title: 'Remove',
          handler: (i, event, payload) => {
            this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
              .then(value => {
                if (value && payload) {
                  // console.log(payload)
                  this.deleteClientInfluencer(payload._id)
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
      influencers: state => state.clients.client.influencers,
      cUser: state => state.user.currentUser
    }),
    total () {
      return size(0)
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      getInfluencersByCID: 'clients/getInfluencersByCID',
      deleteInfluencer: 'clients/deleteInfluencerID',
      getLoggedUserData: 'user/getLoggedUserData',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async fetchData () {
      try {
        if (!this.cUser.client) {
          await this.getLoggedUserData()
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (this.cUser) {
          const res = await this.getInfluencersByCID(this.cUser.client._id)
          console.log(res)
        }
      }
    },
    async deleteClientInfluencer (id) {
      try {
        await this.deleteInfluencer(id)
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

<style>

</style>
